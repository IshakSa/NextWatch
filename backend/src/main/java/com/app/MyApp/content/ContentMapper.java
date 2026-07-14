package com.app.MyApp.content;

import com.app.MyApp.api.*;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ContentMapper {

    private final GenreProviderService genreProviderService;

    public ContentMapper(GenreProviderService genreProviderService) {
        this.genreProviderService = genreProviderService;
    }

    public ContentSummaryDto toContentSummaryDto(ContentSummaryApiDto contentApiDto, ContentType contentType) {
        List<String> genres = genreProviderService.getGenres(contentApiDto.resolveGenreIds(), contentType);

        // round rating to one decimal place
        double roundedRating = Math.round(contentApiDto.rating() * 10.0) / 10.0;

        return ContentSummaryDto.builder()
                .id(contentApiDto.id())
                .genres(genres)
                .title(contentApiDto.title())
                .type(contentType)
                .overview(contentApiDto.overview())
                .length(contentApiDto.runtime())
                .rating(roundedRating)
                .releaseDate(contentApiDto.releaseDate())
                .posterPath(contentApiDto.posterPath())
                .backdropPath(contentApiDto.backdropPath())
                .build();
    }

    // !TODO refactor these two methods
    public List<ContentSummaryDto> toContentSummaryDtoList(
            List<ContentSummaryApiDto> contentApiDtoList, ContentType contentType) {
        int MAX_ITEMS = 20;
        return contentApiDtoList.stream()
                .map(contentApiDto -> toContentSummaryDto(contentApiDto, contentType))
                .toList()
                .subList(0, MAX_ITEMS);
    }

    public List<ContentSummaryDto> toContentSummaryDtoList(List<ContentSummaryApiDto> contentApiDtoList) {
        return contentApiDtoList.stream()
                .map(contentApiDto -> toContentSummaryDto(contentApiDto, contentApiDto.contentType()))
                .toList();
    }

    public ContentDetailsDto toContentDetailsDto(
            ContentSummaryApiDto contentApiDto,
            ContentType contentType,
            String trailerId,
            CreditsApiDto creditsApiDto,
            ProvidersApiDto providersApiDto,
            List<SeasonApiDto> seasonApiDtos,
            TmdbPageResponse<ContentSummaryApiDto> similarApiDtos) {

        List<String> genres = genreProviderService.getGenres(contentApiDto.resolveGenreIds(), contentType);

        final int MAX_ACTOR_ITEMS = 10;
        List<ContentDetailsDto.ActorDto> cast = creditsApiDto.cast().subList(0, MAX_ACTOR_ITEMS).stream()
                .map(castItem -> ContentDetailsDto.ActorDto.builder()
                        .name(castItem.name())
                        .profilePath(castItem.profilePath())
                        .character(castItem.character())
                        .order(castItem.order())
                        .build())
                .toList();

        List<ContentDetailsDto.DirectorDto> directors = creditsApiDto.crew().stream()
                .filter(crewItem ->
                        crewItem.job().equals("Director") || crewItem.job().equals("Author"))
                .map(crewItem -> ContentDetailsDto.DirectorDto.builder()
                        .name(crewItem.name())
                        .profilePath(crewItem.profilePath())
                        .build())
                .toList();

        ContentDetailsDto.CreditsDto credits = ContentDetailsDto.CreditsDto.builder()
                .cast(cast)
                .directors(directors)
                .build();

        Map<String, ContentDetailsDto.ProviderOptionsDto> providers = new HashMap<>();

        providersApiDto
                .providers()
                .forEach((countryCode, optionsDto) -> providers.put(
                        countryCode,
                        ContentDetailsDto.ProviderOptionsDto.builder()
                                .flatrate(mapList(optionsDto.flatrate()))
                                .rent(mapList(optionsDto.rent()))
                                .buy(mapList(optionsDto.buy()))
                                .build()));

        List<ContentDetailsDto.SeasonDto> seasons = null;
        if (seasonApiDtos != null) {
            seasons = seasonApiDtos.stream()
                    .map(season -> ContentDetailsDto.SeasonDto.builder()
                            .seasonNumber(season.seasonNumber())
                            .episodes(season.episodes().stream()
                                    .map(episode -> ContentDetailsDto.EpisodeDto.builder()
                                            .episodeNumber(episode.episodeNumber())
                                            .overview(episode.overview())
                                            .name(episode.name())
                                            .runtime(episode.runtime())
                                            .stillPath(episode.stillPath())
                                            .build())
                                    .toList())
                            .build())
                    .toList();
        }

        List<ContentSummaryDto> similar = null;
        if (similarApiDtos != null) {
            similar = toContentSummaryDtoList(similarApiDtos.results(), contentType);
        }

        return new ContentDetailsDto(
                contentApiDto.id(),
                contentApiDto.title(),
                genres,
                contentType,
                contentApiDto.overview(),
                contentApiDto.runtime(),
                contentApiDto.rating(),
                contentApiDto.releaseDate(),
                contentApiDto.backdropPath(),
                trailerId,
                credits,
                providers,
                seasons,
                similar);
    }

    private List<ContentDetailsDto.ProviderDetailsDto> mapList(List<ProvidersApiDto.ProviderDetailsApiDto> list) {

        if (list == null) return List.of();

        return list.stream()
                .map(detailsApiDto -> ContentDetailsDto.ProviderDetailsDto.builder()
                        .logoPath(detailsApiDto.logoPath())
                        .providerId(detailsApiDto.providerId())
                        .providerName(detailsApiDto.providerName())
                        .displayPriority(detailsApiDto.displayPriority())
                        .build())
                .toList();
    }

    public ContentDetailsDto toContentDetailsDto(
            ContentSummaryApiDto contentApiDto,
            ContentType contentType,
            String trailerId,
            ProvidersApiDto providersApiDto,
            TmdbPageResponse<ContentSummaryApiDto> similarApiDtos,
            CreditsApiDto creditsApiDto) {
        return toContentDetailsDto(
                contentApiDto, contentType, trailerId, creditsApiDto, providersApiDto, null, similarApiDtos);
    }

    public ContentDetailsDto toContentDetailsDto(
            ContentSummaryApiDto contentApiDto,
            ContentType contentType,
            String trailerId,
            CreditsApiDto creditsApiDto,
            ProvidersApiDto providersApiDto,
            List<SeasonApiDto> seasonApiDtos) {
        return toContentDetailsDto(
                contentApiDto, contentType, trailerId, creditsApiDto, providersApiDto, seasonApiDtos, null);
    }

    public ContentDetailsDto toContentDetailsDto(
            ContentSummaryApiDto contentApiDto,
            ContentType contentType,
            String trailerId,
            CreditsApiDto creditsApiDto,
            ProvidersApiDto providersApiDto) {
        return toContentDetailsDto(contentApiDto, contentType, trailerId, creditsApiDto, providersApiDto, null, null);
    }
}
