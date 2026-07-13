package com.app.MyApp.api;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public record ContentTrailerApiDto(@JsonProperty("results") List<TrailerItemApiDto> trailers) {
    public record TrailerItemApiDto(String key) {}
}
