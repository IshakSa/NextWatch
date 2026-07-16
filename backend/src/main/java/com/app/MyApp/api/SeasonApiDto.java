package com.app.MyApp.api;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.time.LocalDate;
import java.util.List;

public record SeasonApiDto(
        @JsonProperty("season_number") int seasonNumber,
        List<EpisodeApiDto> episodes,
        @JsonProperty("air_date") LocalDate releaseDate) {
    public record EpisodeApiDto(
            @JsonProperty("episode_number") int episodeNumber,
            String overview,
            String name,
            Integer runtime,
            @JsonProperty("still_path") String stillPath) {}
}
