package me.nextwatch.NextWatch.api.dtos;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.annotation.Nullable;
import lombok.Builder;
import me.nextwatch.NextWatch.content.ContentType;

import java.time.LocalDate;
import java.util.List;
import java.util.Objects;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Builder(toBuilder = true)
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

        @Nullable @JsonProperty("runtime") @JsonAlias("number_of_episodes")
        Integer length,

        @JsonProperty("vote_average") Double rating,

        @JsonProperty("vote_count") Integer voteCount,

        @Nullable @JsonProperty("media_type") ContentType contentType,
        @Nullable @JsonProperty("number_of_seasons") Integer seasonsAmount,

        @Nullable String trailerId,
        @Nullable @JsonProperty("created_by") List<CreatorApiDto> creatorsDto,

        @Nullable @JsonProperty("videos") ContentTrailerApiDto trailers,
        @Nullable @JsonProperty("credits") CreditsApiDto credits,
        @Nullable @JsonProperty("watch/providers") ProvidersApiDto providers,
        @Nullable @JsonProperty("recommendations") TmdbPageResponse<ContentSummaryApiDto> similar) {

    public List<Integer> resolveGenreIds() {
        return Objects.requireNonNullElseGet(
                genreIds,
                () -> genres().stream().map(TmdbGenreResponse.GenreItem::id).toList());
    }

    public record CreatorApiDto(
            String name, @JsonProperty("profile_path") String profilePath) {}
}
