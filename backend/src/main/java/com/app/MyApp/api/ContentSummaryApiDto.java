package com.app.MyApp.api;

import com.app.MyApp.content.ContentType;
import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.annotation.Nullable;
import lombok.Builder;

import java.time.LocalDate;
import java.util.List;
import java.util.Objects;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Builder
public record ContentSummaryApiDto(
        Integer id,
        // ! REFACTOR: WHEN USE NULLABLE?
        @JsonProperty("backdrop_path") String backdropPath,
        @JsonProperty("poster_path") String posterPath,
        String overview,

        List<TmdbGenreResponse.GenreItem> genres,

        @JsonProperty("genre_ids") List<Integer> genreIds,

        @JsonProperty("release_date") @JsonAlias("first_air_date")
        LocalDate releaseDate,

        @JsonProperty("title") @JsonAlias("name") String title,

        @Nullable @JsonAlias("number_of_episodes") Integer runtime,

        @JsonProperty("vote_average") double rating,

        @Nullable @JsonProperty("media_type") ContentType contentType,
        @Nullable @JsonProperty("number_of_seasons") Integer seasonsAmount) {

    public List<Integer> resolveGenreIds() {
        return Objects.requireNonNullElseGet(
                genreIds,
                () -> genres().stream().map(TmdbGenreResponse.GenreItem::id).toList());
    }
}
