package com.app.MyApp.content;

import java.util.List;

import org.springframework.stereotype.Service;

import com.app.MyApp.utils.MockData;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class ContentService {

    public List<ContentSummaryDto> getLatestReleases() {
        return MockData.mockDataList;
    }

    public List<ContentSummaryDto> getTopRated(ContentType contentType) {
        return MockData.mockDataList;
    }

    public List<ContentSummaryDto> getTrending(TimeWindow timeWindow) {
        return switch (timeWindow) {
            case DAY -> MockData.mockDataList.subList(0, 5);
            case WEEK -> MockData.mockDataList.subList(0, 10);
        };
    }

    public ContentDetailsDto getDetails(Integer id, ContentType contentType, boolean includeSimilar) {
        ContentSummaryDto mockMovie = MockData.mockDataList.stream().filter((movie) -> movie.id().equals(id))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Content not found"));

        return new ContentDetailsDto(id, mockMovie.title(), mockMovie.genres(), contentType,
                mockMovie.overview(),
                mockMovie.length(), mockMovie.rating(), mockMovie.releaseDate(),
                mockMovie.backdropPath(),
                mockMovie.trailerId(), MockData.creditsDto, MockData.providersMap,
                contentType == ContentType.TV ? MockData.seasonsList : null,
                includeSimilar ? MockData.mockDataList : null);
    }
}
