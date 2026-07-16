package com.app.MyApp.content;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.annotation.Nullable;
import lombok.Builder;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public record ContentDetailsDto(
        Integer id,
        String title,
        List<String> genres,
        ContentType type,
        String overview,
        int length,
        double rating,
        LocalDate releaseDate,
        String backdropPath,
        String trailerId,
        CreditsDto credits,
        Map<String, ProviderOptionsDto> providers,

        @Nullable List<SeasonDto> seasons,

        @Nullable List<ContentSummaryDto> similar) {

    @Builder
    public record CreditsDto(List<ActorDto> cast, List<DirectorDto> directors) {}

    @Builder
    public record ActorDto(String name, String profilePath, String character, int order) {}

    @Builder
    public record DirectorDto(String name, String profilePath) {}

    @Builder
    public record ProviderOptionsDto(
            List<ProviderDetailsDto> flatrate, List<ProviderDetailsDto> rent, List<ProviderDetailsDto> buy) {}

    @Builder
    public record ProviderDetailsDto(String logoPath, int providerId, String providerName, int displayPriority) {}

    @Builder
    public record SeasonDto(int seasonNumber, List<EpisodeDto> episodes, LocalDate releaseDate) {}

    @Builder
    public record EpisodeDto(int episodeNumber, String overview, String name, Integer runtime, String stillPath) {}
}
