package com.app.MyApp.api;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public record ContentTrailerApiDto(@JsonProperty("results") List<TrailerItemApiDto> trailers) {
    public String getTrailerId() {
        return trailers.stream()
                .filter(item -> item.type().equals("Trailer"))
                .toList()
                .getFirst()
                .key();
    }

    public record TrailerItemApiDto(
            String key,
            String type,
            @JsonProperty("official") boolean isOfficial) {}
}
