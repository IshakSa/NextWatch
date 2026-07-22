package me.nextwatch.NextWatch.content;

import me.nextwatch.NextWatch.api.TmdbApiClient;
import me.nextwatch.NextWatch.api.TmdbPageResponse;
import me.nextwatch.NextWatch.api.dtos.*;
import me.nextwatch.NextWatch.content.dtos.ContentDetailsDto;
import me.nextwatch.NextWatch.content.dtos.ContentSummaryDto;
import me.nextwatch.NextWatch.recommendation.EmbeddingService;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class ContentService {

    private final TmdbApiClient tmdbApiClient;
    private final ContentMapper contentMapper;
    private final EmbeddingService embeddingService;
    private final ContentRepository contentRepository;

    public ContentService(
            TmdbApiClient tmdbApiClient,
            ContentMapper contentMapper,
            EmbeddingService embeddingService,
            ContentRepository contentRepository) {
        this.tmdbApiClient = tmdbApiClient;
        this.contentMapper = contentMapper;
        this.embeddingService = embeddingService;
        this.contentRepository = contentRepository;
    }

    private void saveNewContentAsEmbedding(ContentSummaryDto content) {
        if (contentRepository.existsById(new ContentId(content.id(), content.type()))) {
            return;
        }

        float[] embedding = embeddingService.getContentEmbedding(content);

        Content contentEmbedding = Content.builder()
                .id(new ContentId(content.id(), content.type()))
                .embedding(embedding)
                .build();
        contentRepository.save(contentEmbedding);
    }

    private void saveNewContentAsEmbedding(List<ContentSummaryDto> content) {
        content.forEach(this::saveNewContentAsEmbedding);
    }

    public List<ContentSummaryDto> getUpcoming() {
        LocalDate minDate = LocalDate.now().plusDays(1);
        LocalDate maxDate = LocalDate.now().plusMonths(3);
        List<ContentSummaryApiDto> response =
                tmdbApiClient.getUpcoming(minDate, maxDate).results();

        List<ContentSummaryDto> content = contentMapper.toContentSummaryDtoList(response, ContentType.MOVIE);
        saveNewContentAsEmbedding(content);
        return content;
    }

    public List<ContentSummaryDto> getTopRated(ContentType contentType) {
        List<ContentSummaryApiDto> response =
                tmdbApiClient.getTopRated(contentType.toLower()).results();

        List<ContentSummaryDto> content = contentMapper.toContentSummaryDtoList(response, contentType);
        saveNewContentAsEmbedding(content);
        return content;
    }

    public List<ContentSummaryDto> getTrending(TimeWindow timeWindow, boolean includeTrailer) {
        final int MAX_ITEMS_FOR_DAY = 5;
        final int MAX_ITEMS_FOR_WEEK = 10;
        int maxItems = timeWindow.equals(TimeWindow.DAY) ? MAX_ITEMS_FOR_DAY : MAX_ITEMS_FOR_WEEK;

        List<ContentSummaryApiDto> response = tmdbApiClient
                .getTrending(timeWindow.toString().toLowerCase())
                .results()
                .subList(0, maxItems);

        // runtime is only needed for hero section (day TimeWindow)
        if (timeWindow.equals(TimeWindow.DAY)) {
            response = response.parallelStream()
                    .map(apiDto -> {
                        ContentRuntimeDto runtimeResponse = tmdbApiClient.getContentRuntime(
                                apiDto.contentType().toString().toLowerCase(), apiDto.id());

                        return ContentSummaryApiDto.builder()
                                .id(apiDto.id())
                                .contentType(apiDto.contentType())
                                .length(runtimeResponse.length())
                                .rating(apiDto.rating())
                                .overview(apiDto.overview())
                                .title(apiDto.title())
                                .genreIds(apiDto.genreIds())
                                .posterPath(apiDto.posterPath())
                                .backdropPath(apiDto.backdropPath())
                                .releaseDate(apiDto.releaseDate())
                                .build();
                    })
                    .toList();
        }

        if (includeTrailer) {
            response = response.parallelStream()
                    .map(apiDto -> {
                        String trailerId = tmdbApiClient
                                .getTrailers(apiDto.contentType().toString().toLowerCase(), apiDto.id())
                                .getTrailerId();

                        return ContentSummaryApiDto.builder()
                                .id(apiDto.id())
                                .contentType(apiDto.contentType())
                                .length(apiDto.length())
                                .rating(apiDto.rating())
                                .overview(apiDto.overview())
                                .title(apiDto.title())
                                .genreIds(apiDto.genreIds())
                                .posterPath(apiDto.posterPath())
                                .backdropPath(apiDto.backdropPath())
                                .releaseDate(apiDto.releaseDate())
                                .trailerId(trailerId)
                                .build();
                    })
                    .toList();
        }

        List<ContentSummaryDto> content = contentMapper.toContentSummaryDtoList(response);
        saveNewContentAsEmbedding(content);
        return content;
    }

    public ContentDetailsDto getDetails(Integer id, ContentType contentType, boolean includeSimilar) {

        ContentSummaryApiDto summaryDto =
                tmdbApiClient.getDetails(contentType.toString().toLowerCase(), id);

        String trailerId = tmdbApiClient
                .getTrailers(contentType.toString().toLowerCase(), id)
                .getTrailerId();

        CreditsApiDto creditsApiDto =
                tmdbApiClient.getCredits(contentType.toString().toLowerCase(), id);

        ProvidersApiDto providersApiDto =
                tmdbApiClient.getProviders(contentType.toString().toLowerCase(), id);

        TmdbPageResponse<ContentSummaryApiDto> similarApiDtos =
                tmdbApiClient.getSimilar(contentType.toString().toLowerCase(), id);

        if (contentType.equals(ContentType.MOVIE) && includeSimilar) {
            return contentMapper.toContentDetailsDto(
                    summaryDto, contentType, trailerId, providersApiDto, similarApiDtos, creditsApiDto);
        } else if (contentType.equals(ContentType.MOVIE) && !includeSimilar) {
            return contentMapper.toContentDetailsDto(
                    summaryDto, contentType, trailerId, creditsApiDto, providersApiDto);
        }

        List<SeasonApiDto> seasonApiDtos = new ArrayList<>();
        for (int i = 1; i <= summaryDto.seasonsAmount(); i++) {
            SeasonApiDto seasonApiDto = tmdbApiClient.getSeason(id, i);
            seasonApiDtos.add(seasonApiDto);
        }

        if (includeSimilar) {
            return contentMapper.toContentDetailsDto(
                    summaryDto, contentType, trailerId, creditsApiDto, providersApiDto, seasonApiDtos, similarApiDtos);
        }

        return contentMapper.toContentDetailsDto(
                summaryDto, contentType, trailerId, creditsApiDto, providersApiDto, seasonApiDtos);
    }

    public List<ContentSummaryDto> searchByName(String query) {
        if (query.isBlank()) {
            return List.of();
        }

        // Filter out niche or unverified content by requiring a minimum of 10 ratings,
        // tradeoff: unreleased, popular titles with no ratings will be filtered out, however,
        // unreleased but popular titles are often already included in home page at the "Upcoming releases" section
        List<ContentSummaryApiDto> apiResults = tmdbApiClient.search(query).results().stream()
                .filter(item -> item.contentType() != ContentType.PERSON && item.voteCount() >= 10)
                .toList();

        List<ContentSummaryDto> content = contentMapper.toContentSummaryDtoList(apiResults);
        saveNewContentAsEmbedding(content);
        return content;
    }

    public ContentSummaryDto getContentByIdAndByType(Integer contentId, ContentType contentType) {
        ContentSummaryApiDto response = tmdbApiClient.getContentByTypeAndById(contentId, contentType.toLower());

        ContentSummaryDto content = contentMapper.toContentSummaryDto(response, contentType);
        saveNewContentAsEmbedding(content);
        return content;
    }
}
