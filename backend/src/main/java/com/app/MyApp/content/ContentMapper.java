package com.app.MyApp.content;

import com.app.MyApp.api.GenreProviderService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ContentMapper {

    private final GenreProviderService genreProviderService;

    public ContentMapper(GenreProviderService genreProviderService) {
        this.genreProviderService = genreProviderService;
    }

    public ContentSummaryDto toContentSummaryDto(ContentSummaryApiDto contentApiDto, ContentType contentType) {
        List<String> genres = genreProviderService.getGenres(contentApiDto.resolveGenreIds(), contentType);

        // round rating to one decimal place
        double roundedRating = Math.round(contentApiDto.rating() * 10.0) / 10.0;

        return ContentSummaryDto.builder()
                .id(contentApiDto.id())
                .genres(genres)
                .title(contentApiDto.title())
                .type(contentType)
                .overview(contentApiDto.overview())
                .length(contentApiDto.runtime())
                .rating(roundedRating)
                .releaseDate(contentApiDto.releaseDate())
                .posterPath(contentApiDto.posterPath())
                .backdropPath(contentApiDto.backdropPath())
                .build();
    }

    public List<ContentSummaryDto> toContentSummaryDtoList(
            List<ContentSummaryApiDto> contentApiDtoList, ContentType contentType) {
        return contentApiDtoList.stream()
                .map(contentApiDto -> toContentSummaryDto(contentApiDto, contentType))
                .toList()
                .subList(0, 20);
    }
}
