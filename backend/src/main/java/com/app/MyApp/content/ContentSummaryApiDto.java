package com.app.MyApp.content;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.annotation.Nullable;

import java.time.LocalDate;
import java.util.List;

@JsonInclude(JsonInclude.Include.NON_NULL)
public record ContentSummaryApiDto(
        Integer id,
        @JsonProperty("backdrop_path") String backdropPath,
        @JsonProperty("poster_path") String posterPath,
        String overview,
        List<GenreItem> genres,
        @JsonProperty("release_path") LocalDate releaseDate,
        String title,

        @Nullable @JsonProperty("number_of_episodes") Integer episodes,
        @Nullable @JsonProperty Integer runtime,

        @JsonProperty("vote_average") double rating

) {
    public record GenreItem(Integer id, String name) {
    }
}
