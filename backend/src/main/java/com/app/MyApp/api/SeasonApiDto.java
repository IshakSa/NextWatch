package com.app.MyApp.api;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public record SeasonApiDto(@JsonProperty("season_number") int seasonNumber, List<EpisodeApiDto> episodes) {
    public record EpisodeApiDto(
            @JsonProperty("episode_number") int episodeNumber,
            String overview,
            String name,
            int runtime,
            @JsonProperty("still_path") String stillPath) {}
}
