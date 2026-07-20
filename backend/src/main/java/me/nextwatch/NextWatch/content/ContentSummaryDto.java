package me.nextwatch.NextWatch.content;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.annotation.Nullable;
import lombok.Builder;

import java.time.LocalDate;
import java.util.List;

@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public record ContentSummaryDto(
        Integer id,
        String title,
        List<String> genres,
        ContentType type,
        String overview,
        @Nullable Integer length,
        double rating,
        LocalDate releaseDate,
        String posterPath,
        String backdropPath,

        @Nullable String trailerId) {}
