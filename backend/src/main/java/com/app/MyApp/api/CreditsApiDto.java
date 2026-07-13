package com.app.MyApp.api;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public record CreditsApiDto(List<CastItem> cast, List<CrewItem> crew) {

    public record CastItem(
            String name, @JsonProperty("profile_path") String profilePath, String character, int order) {}

    public record CrewItem(
            String name, @JsonProperty("profile_path") String profilePath, String job) {}
}
