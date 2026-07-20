package me.nextwatch.NextWatch.api;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public record ContentTrailerApiDto(@JsonProperty("results") List<TrailerItemApiDto> trailers) {
    public String getTrailerId() {
        List<TrailerItemApiDto> filteredTrailers =
                trailers.stream().filter(item -> item.type().equals("Trailer")).toList();
        if (filteredTrailers.isEmpty()) {
            return null;
        }
        return filteredTrailers.getFirst().key();
    }

    public record TrailerItemApiDto(
            String key,
            String type,
            @JsonProperty("official") boolean isOfficial) {}
}
