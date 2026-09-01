package me.nextwatch.NextWatch.api;

import me.nextwatch.NextWatch.api.dtos.ContentSummaryApiDto;
import me.nextwatch.NextWatch.api.dtos.SeasonApiDto;
import me.nextwatch.NextWatch.content.ContentType;
import me.nextwatch.NextWatch.content.dtos.ContentDetailsDto;
import org.springframework.stereotype.Service;

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
            AppendToResponse.RECOMMENDATIONS,
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
        boolean shouldAppendSeasons = false;
        if (contentType.equals(ContentType.TV)) {
            shouldAppendSeasons = appendToResponse.remove(AppendToResponse.SEASONS);
        }

        ContentSummaryApiDto apiDto = tmdbApiClient.getContentDetails(
                contentType.toString().toLowerCase(), id, mapAppendToResponseToString(appendToResponse));

        List<SeasonApiDto> seasonApiDtos = null;
        if (shouldAppendSeasons) {
            seasonApiDtos = getSeasons(id, apiDto.seasonsAmount());
        }

        return tmdbApiMapper.toContentDetailsDto(apiDto, contentType, seasonApiDtos);
    }

    public ContentDetailsDto getContentDetails(ContentType contentType, Integer id) {
        return getContentDetails(contentType, id, List.of());
    }

    private List<SeasonApiDto> getSeasons(Integer id, Integer totalSeasons) {
        List<SeasonApiDto> seasonApiDtos = new ArrayList<>();
        for (int i = 1; i <= totalSeasons; i++) {
            SeasonApiDto seasonApiDto = tmdbApiClient.getSeason(id, i);
            seasonApiDtos.add(seasonApiDto);
        }

        return seasonApiDtos;
    }
}
