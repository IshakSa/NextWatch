package me.nextwatch.NextWatch.api.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;
import java.util.Map;

public record ProvidersApiDto(@JsonProperty("results") Map<String, ProviderOptionsApiDto> providers) {

    public record ProviderOptionsApiDto(
            List<ProviderDetailsApiDto> flatrate, List<ProviderDetailsApiDto> rent, List<ProviderDetailsApiDto> buy) {}

    public record ProviderDetailsApiDto(
            @JsonProperty("logo_path") String logoPath,
            @JsonProperty("provider_id") int providerId,
            @JsonProperty("provider_name") String providerName,
            @JsonProperty("display_priority") int displayPriority) {}
}
