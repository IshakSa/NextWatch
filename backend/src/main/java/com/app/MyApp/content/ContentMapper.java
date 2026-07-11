package com.app.MyApp.content;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class ContentMapper {

    public ContentSummaryDto toContentSummaryDto(ContentSummaryApiDto contentApiDto, ContentType contentType) {
        List<String> genres = contentApiDto.genres().stream().map(genreItem -> genreItem.name()).toList();
        int length = 0;

        // round rating to one decimal place
        double roundedRating = Math.round(contentApiDto.rating() * 10.0) / 10.0;

        if (contentType.equals(ContentType.MOVIE)) {
            length = contentApiDto.runtime();
        } else {
            length = contentApiDto.episodes();
        }
        return ContentSummaryDto.builder().id(contentApiDto.id()).genres(genres).title(contentApiDto.title())
                .type(contentType)
                .overview(contentApiDto.overview())
                .length(length)
                .rating(roundedRating)
                .releaseDate(contentApiDto.releaseDate())
                .posterPath(contentApiDto.posterPath())
                .backdropPath(contentApiDto.backdropPath())
                .build();
    }

}
