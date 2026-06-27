package com.app.MyApp.content;

import java.time.LocalDate;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonInclude;

import jakarta.annotation.Nullable;
import lombok.Builder;

@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public record ContentSummaryDto(
        Integer id,
        String title,
        List<String> genres,
        ContentType type,
        String overview,
        int length,
        double rating,
        LocalDate releaseDate,
        String posterPath,
        String backdropPath,

        @Nullable
        String trailerId) {
}
