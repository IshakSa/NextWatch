package me.nextwatch.NextWatch.api;

import me.nextwatch.NextWatch.api.dtos.ContentSummaryApiDto;
import me.nextwatch.NextWatch.api.dtos.SeasonApiDto;
import me.nextwatch.NextWatch.content.ContentType;
import me.nextwatch.NextWatch.content.TimeWindow;
import me.nextwatch.NextWatch.content.dtos.ContentDetailsDto;
import me.nextwatch.NextWatch.content.dtos.ContentSummaryDto;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class TmdbApiService {
    private final TmdbApiClient tmdbApiClient;
    private final TmdbApiMapper tmdbApiMapper;

    private final Map<AppendToResponse, String> appendToResponseMap = Map.of(
            AppendToResponse.CREDITS,
            "credits",
            AppendToResponse.TRAILERS,
            "videos",
            AppendToResponse.WATCH_PROVIDERS,
            "watch/providers",
            AppendToResponse.SIMILAR,
            "recommendations",
            AppendToResponse.SEASONS,
            "season");

    public TmdbApiService(TmdbApiClient tmdbApiClient, TmdbApiMapper tmdbApiMapper) {
        this.tmdbApiClient = tmdbApiClient;
        this.tmdbApiMapper = tmdbApiMapper;
    }

    private String mapAppendToResponseToString(List<AppendToResponse> appendToResponse) {
        List<String> mappedAppendToResponseValues =
                appendToResponse.stream().map(appendToResponseMap::get).toList();
        return String.join(",", mappedAppendToResponseValues);
    }

    public ContentDetailsDto getContentDetails(
            ContentType contentType, Integer id, List<AppendToResponse> appendToResponse) {
        List<AppendToResponse> appendList = new ArrayList<>(appendToResponse);
        boolean shouldAppendSeasons = contentType == ContentType.TV && appendList.remove(AppendToResponse.SEASONS);

        ContentSummaryApiDto apiDto = tmdbApiClient.getContentDetails(
                contentType.toString().toLowerCase(), id, mapAppendToResponseToString(appendList));

        List<SeasonApiDto> seasonApiDtos = shouldAppendSeasons ? getSeasons(id, apiDto.seasonsAmount()) : null;

        return tmdbApiMapper.toContentDetailsDto(apiDto, contentType, seasonApiDtos);
    }

    public ContentDetailsDto getContentDetails(ContentType contentType, Integer id, AppendToResponse appendToResponse) {
        return getContentDetails(contentType, id, List.of(appendToResponse));
    }

    public ContentSummaryDto getContentSummary(ContentType contentType, Integer id, boolean includeTrailer) {
        List<AppendToResponse> appendToResponse = includeTrailer ? List.of(AppendToResponse.TRAILERS) : List.of();

        ContentSummaryApiDto response = tmdbApiClient.getContentDetails(
                contentType.toString().toLowerCase(), id, mapAppendToResponseToString(appendToResponse));

        if (includeTrailer) {
            String trailerId = response.trailers() != null ? response.trailers().getTrailerId() : null;
            response = response.toBuilder().trailerId(trailerId).build();
        }

        return tmdbApiMapper.toContentSummaryDto(response, contentType);
    }

    private List<SeasonApiDto> getSeasons(Integer id, Integer totalSeasons) {
        List<SeasonApiDto> seasonApiDtos = new ArrayList<>();
        for (int i = 1; i <= totalSeasons; i++) {
            SeasonApiDto seasonApiDto = tmdbApiClient.getSeason(id, i);
            seasonApiDtos.add(seasonApiDto);
        }

        return seasonApiDtos;
    }

    public List<ContentSummaryDto> getUpcoming(LocalDate minDate, LocalDate maxDate) {
        List<ContentSummaryApiDto> response =
                tmdbApiClient.getUpcoming(minDate, maxDate).results();

        return tmdbApiMapper.toContentSummaryDtoList(response, ContentType.MOVIE);
    }

    public List<ContentSummaryDto> getTopRated(ContentType contentType) {
        List<ContentSummaryApiDto> response =
                tmdbApiClient.getTopRated(contentType.toLower()).results();

        return tmdbApiMapper.toContentSummaryDtoList(response, contentType);
    }

    public List<ContentSummaryDto> getTrending(TimeWindow timeWindow, int maxItems, boolean includeTrailer) {
        List<ContentSummaryApiDto> response = tmdbApiClient
                .getTrending(timeWindow.toString().toLowerCase())
                .results()
                .subList(0, maxItems);

        // runtime is only needed for hero section (day TimeWindow)
        if (timeWindow.equals(TimeWindow.DAY) && includeTrailer) {
            response = response.parallelStream()
                    .map(apiDto -> {
                        ContentDetailsDto trendingDayDetails =
                                getContentDetails(apiDto.contentType(), apiDto.id(), AppendToResponse.TRAILERS);
                        return apiDto.toBuilder()
                                .length(trendingDayDetails.length())
                                .trailerId(trendingDayDetails.trailerId())
                                .build();
                    })
                    .toList();
        }

        return tmdbApiMapper.toContentSummaryDtoList(response);
    }

    public List<ContentSummaryDto> searchByName(String query) {
        // Filter out niche or unverified content by requiring a minimum of 10 ratings,
        // tradeoff: unreleased, popular titles with no ratings will be filtered out, however,
        // unreleased but popular titles are often already included in home page at the "Upcoming releases" section
        List<ContentSummaryApiDto> response = tmdbApiClient.search(query).results().stream()
                .filter(item -> item.contentType() != ContentType.PERSON && item.voteCount() >= 10)
                .toList();

        return tmdbApiMapper.toContentSummaryDtoList(response);
    }
}
