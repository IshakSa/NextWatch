package me.nextwatch.NextWatch.api;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public record TmdbPageResponse<T>(
        int page,
        List<T> results,
        @JsonProperty("total_pages") int totalPages,
        @JsonProperty("total_results") int totalResults) {}
