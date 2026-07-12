package com.app.MyApp.content;

import com.app.MyApp.api.TmdbApiClient;
import com.app.MyApp.api.TmdbPageResponse;
import com.app.MyApp.utils.MockData;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ContentService {

    private final TmdbApiClient tmdbApiClient;
    private final ContentMapper contentMapper;

    public ContentService(TmdbApiClient tmdbApiClient, ContentMapper contentMapper) {
        this.tmdbApiClient = tmdbApiClient;
        this.contentMapper = contentMapper;
    }

    public List<ContentSummaryDto> getLatestReleases() {
        return MockData.mockDataList;
    }

    public List<ContentSummaryDto> getTopRated(ContentType contentType) {
        TmdbPageResponse<ContentSummaryApiDto> response = tmdbApiClient.getTopRated(contentType.toLower());
        return contentMapper.toContentSummaryDtoList(response.results(), contentType);
    }

    public List<ContentSummaryDto> getTrending(TimeWindow timeWindow, boolean includeTrailer) {
        return switch (timeWindow) {
            case DAY -> MockData.mockDataList.subList(0, 5);
            case WEEK -> MockData.mockDataList.subList(0, 10);
        };
    }

    public ContentDetailsDto getDetails(Integer id, ContentType contentType, boolean includeSimilar) {
        ContentSummaryDto mockMovie = MockData.mockDataList.stream()
                .filter((movie) -> movie.id().equals(id))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Content not found"));

        return new ContentDetailsDto(
                id,
                mockMovie.title(),
                mockMovie.genres(),
                contentType,
                mockMovie.overview(),
                mockMovie.length(),
                mockMovie.rating(),
                mockMovie.releaseDate(),
                mockMovie.backdropPath(),
                mockMovie.trailerId(),
                MockData.creditsDto,
                MockData.providersMap,
                contentType == ContentType.TV ? MockData.seasonsList : null,
                includeSimilar ? MockData.mockDataList : null);
    }

    public List<ContentSummaryDto> searchByName(String query) {
        final int MAX_RESULTS_AMOUNT = 20;

        if (query.isBlank()) {
            return List.of();
        }

        String cleanQuery = query.strip().toLowerCase();
        List<ContentSummaryDto> matches = MockData.mockDataList.stream()
                .filter(item -> item.title().strip().toLowerCase().contains(cleanQuery))
                .toList();

        if (matches.size() <= MAX_RESULTS_AMOUNT) {
            return matches;
        }
        return matches.subList(0, MAX_RESULTS_AMOUNT);
    }

    public ContentSummaryDto getContentByIdAndByType(Integer contentId, ContentType contentType) {
        ContentSummaryApiDto response = tmdbApiClient.getContentByTypeAndById(contentId, contentType.toLower());
        return contentMapper.toContentSummaryDto(response, contentType);
    }
}
