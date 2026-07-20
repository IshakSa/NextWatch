package me.nextwatch.NextWatch.api;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonProperty;

public record ContentRuntimeDto(
        @JsonProperty("runtime") @JsonAlias({"number_of_episodes"})
        int length) {}
