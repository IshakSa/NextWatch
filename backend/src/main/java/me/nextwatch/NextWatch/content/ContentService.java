package me.nextwatch.NextWatch.content;

import me.nextwatch.NextWatch.api.*;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class ContentService {

    private final TmdbApiClient tmdbApiClient;
    private final ContentMapper contentMapper;

    public ContentService(TmdbApiClient tmdbApiClient, ContentMapper contentMapper) {
        this.tmdbApiClient = tmdbApiClient;
        this.contentMapper = contentMapper;
    }

    public List<ContentSummaryDto> getUpcoming() {
        LocalDate minDate = LocalDate.now().plusDays(1);
        LocalDate maxDate = LocalDate.now().plusMonths(3);
        List<ContentSummaryApiDto> response =
                tmdbApiClient.getUpcoming(minDate, maxDate).results();

        return contentMapper.toContentSummaryDtoList(response, ContentType.MOVIE);
    }

    public List<ContentSummaryDto> getTopRated(ContentType contentType) {
        List<ContentSummaryApiDto> response =
                tmdbApiClient.getTopRated(contentType.toLower()).results();
        return contentMapper.toContentSummaryDtoList(response, contentType);
    }

    // TODO: add include trailer logic
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

        return contentMapper.toContentSummaryDtoList(response);
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

        return contentMapper.toContentSummaryDtoList(apiResults);
    }

    public ContentSummaryDto getContentByIdAndByType(Integer contentId, ContentType contentType) {
        ContentSummaryApiDto response = tmdbApiClient.getContentByTypeAndById(contentId, contentType.toLower());
        return contentMapper.toContentSummaryDto(response, contentType);
    }
}
