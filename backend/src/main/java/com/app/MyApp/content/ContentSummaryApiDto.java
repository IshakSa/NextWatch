package com.app.MyApp.content;

import com.app.MyApp.api.TmdbGenreResponse;
import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.annotation.Nullable;

import java.time.LocalDate;
import java.util.List;
import java.util.Objects;

@JsonInclude(JsonInclude.Include.NON_NULL)
public record ContentSummaryApiDto(
        Integer id,

        @JsonProperty("backdrop_path") String backdropPath,
        @JsonProperty("poster_path") String posterPath,
        String overview,

        TmdbGenreResponse genres,

        @JsonProperty("genre_ids") List<Integer> genreIds,

        @JsonProperty("release_path") LocalDate releaseDate,

        @JsonProperty("title") @JsonAlias("name") String title,

        @Nullable @JsonAlias("number_of_episodes") Integer runtime,

        @JsonProperty("vote_average") double rating) {

    public List<Integer> resolveGenreIds() {
        return Objects.requireNonNullElseGet(
                genreIds,
                () -> genres.genres().stream()
                        .map(TmdbGenreResponse.GenreItem::id)
                        .toList());
    }
}
