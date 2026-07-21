package me.nextwatch.NextWatch.api.dtos;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonProperty;

public record ContentRuntimeDto(
        @JsonProperty("runtime") @JsonAlias({"number_of_episodes"})
        int length) {}
