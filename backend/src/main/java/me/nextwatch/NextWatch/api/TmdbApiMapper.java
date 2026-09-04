package me.nextwatch.NextWatch.api;

import jakarta.annotation.Nullable;
import me.nextwatch.NextWatch.api.dtos.ContentSummaryApiDto;
import me.nextwatch.NextWatch.api.dtos.CreditsApiDto;
import me.nextwatch.NextWatch.api.dtos.ProvidersApiDto;
import me.nextwatch.NextWatch.api.dtos.SeasonApiDto;
import me.nextwatch.NextWatch.content.ContentType;
import me.nextwatch.NextWatch.content.dtos.ContentDetailsDto;
import me.nextwatch.NextWatch.content.dtos.ContentSummaryDto;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class TmdbApiMapper {
    private final GenreProviderService genreProviderService;

    public TmdbApiMapper(GenreProviderService genreProviderService) {
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
                .length(contentApiDto.length())
                .rating(roundedRating)
                .releaseDate(contentApiDto.releaseDate())
                .posterPath(contentApiDto.posterPath())
                .backdropPath(contentApiDto.backdropPath())
                .trailerId(contentApiDto.trailerId())
                .build();
    }

    /**
     * Used when the {@code ContentType} is not in the api response but rather given as a path variable in the controller
     */
    public List<ContentSummaryDto> toContentSummaryDtoList(
            List<ContentSummaryApiDto> contentApiDtoList, ContentType contentType) {
        int MAX_ITEMS = 20;
        return contentApiDtoList.stream()
                .map(contentApiDto -> toContentSummaryDto(contentApiDto, contentType))
                .toList()
                .subList(0, MAX_ITEMS);
    }

    /**
     * Used when the {@code ContentType} is already in the api response
     */
    public List<ContentSummaryDto> toContentSummaryDtoList(List<ContentSummaryApiDto> contentApiDtoList) {
        return contentApiDtoList.stream()
                .map(contentApiDto -> toContentSummaryDto(contentApiDto, contentApiDto.contentType()))
                .toList();
    }

    public ContentDetailsDto toContentDetailsDto(
            ContentSummaryApiDto apiDto, ContentType contentType, @Nullable List<SeasonApiDto> seasonApiDtos) {
        List<String> genres = genreProviderService.getGenres(apiDto.resolveGenreIds(), contentType);

        String trailerId = apiDto.trailers() != null ? apiDto.trailers().getTrailerId() : null;

        ContentDetailsDto.CreditsDto credits = getCreditsDto(apiDto, contentType);

        Map<String, ContentDetailsDto.ProviderOptionsDto> providers = getProviders(apiDto);

        List<ContentSummaryDto> similar = getSimilar(apiDto, contentType);

        List<ContentDetailsDto.SeasonDto> seasons = getSeasons(seasonApiDtos);

        return new ContentDetailsDto(
                apiDto.id(),
                apiDto.title(),
                genres,
                contentType,
                apiDto.overview(),
                apiDto.length(),
                apiDto.rating(),
                apiDto.releaseDate(),
                apiDto.backdropPath(),
                trailerId,
                credits,
                providers,
                seasons,
                similar);
    }

    private ContentDetailsDto.CreditsDto getCreditsDto(ContentSummaryApiDto apiDto, ContentType contentType) {
        if (apiDto.credits() == null) {
            return null;
        }

        final int MAX_CREDIT_ITEMS = 10;

        List<ContentDetailsDto.ActorDto> cast = apiDto.credits().cast().stream()
                .limit(MAX_CREDIT_ITEMS)
                .map(this::toActorDto)
                .toList();

        List<ContentDetailsDto.DirectorDto> directors;
        if (contentType == ContentType.TV && apiDto.creatorsDto() != null) {
            directors = apiDto.creatorsDto().stream()
                    .limit(MAX_CREDIT_ITEMS)
                    .map(this::toDirectorDto)
                    .toList();
        } else {
            directors = apiDto.credits().crew().stream()
                    .filter(crewItem -> crewItem.job().equals("Direct" + "or"))
                    .limit(MAX_CREDIT_ITEMS)
                    .map(this::toDirectorDto)
                    .toList();
        }

        return ContentDetailsDto.CreditsDto.builder()
                .cast(cast)
                .directors(directors)
                .build();
    }

    private ContentDetailsDto.ActorDto toActorDto(CreditsApiDto.CastItem castItem) {
        return ContentDetailsDto.ActorDto.builder()
                .name(castItem.name())
                .profilePath(castItem.profilePath())
                .character(castItem.character())
                .order(castItem.order())
                .build();
    }

    private ContentDetailsDto.DirectorDto toDirectorDto(CreditsApiDto.CrewItem crewItem) {
        return ContentDetailsDto.DirectorDto.builder()
                .name(crewItem.name())
                .profilePath(crewItem.profilePath())
                .build();
    }

    private ContentDetailsDto.DirectorDto toDirectorDto(ContentSummaryApiDto.CreatorApiDto creator) {
        return ContentDetailsDto.DirectorDto.builder()
                .name(creator.name())
                .profilePath(creator.profilePath())
                .build();
    }

    private Map<String, ContentDetailsDto.ProviderOptionsDto> getProviders(ContentSummaryApiDto apiDto) {
        if (apiDto.providers() == null) {
            return null;
        }

        Map<String, ContentDetailsDto.ProviderOptionsDto> providers = new HashMap<>();
        apiDto.providers()
                .providers()
                .forEach((countryCode, optionsApiDto) ->
                        providers.put(countryCode, toProviderOptionsDto(optionsApiDto)));

        return providers;
    }

    private ContentDetailsDto.ProviderOptionsDto toProviderOptionsDto(
            ProvidersApiDto.ProviderOptionsApiDto optionsApiDto) {
        return ContentDetailsDto.ProviderOptionsDto.builder()
                .flatrate(toProviderDetailsDtos(optionsApiDto.flatrate()))
                .rent(toProviderDetailsDtos(optionsApiDto.rent()))
                .buy(toProviderDetailsDtos(optionsApiDto.buy()))
                .build();
    }

    private List<ContentDetailsDto.ProviderDetailsDto> toProviderDetailsDtos(
            List<ProvidersApiDto.ProviderDetailsApiDto> providerDetailsApiDtos) {
        if (providerDetailsApiDtos == null) return List.of();

        return providerDetailsApiDtos.stream()
                .map(detailsApiDto -> ContentDetailsDto.ProviderDetailsDto.builder()
                        .logoPath(detailsApiDto.logoPath())
                        .providerId(detailsApiDto.providerId())
                        .providerName(detailsApiDto.providerName())
                        .displayPriority(detailsApiDto.displayPriority())
                        .build())
                .toList();
    }

    private List<ContentSummaryDto> getSimilar(ContentSummaryApiDto apiDto, ContentType contentType) {
        if (apiDto.similar() == null) {
            return null;
        }
        return toContentSummaryDtoList(apiDto.similar().results(), contentType);
    }

    private List<ContentDetailsDto.SeasonDto> getSeasons(List<SeasonApiDto> seasonApiDtos) {
        if (seasonApiDtos == null) {
            return null;
        }

        return seasonApiDtos.stream()
                .map(season -> ContentDetailsDto.SeasonDto.builder()
                        .seasonNumber(season.seasonNumber())
                        .releaseDate(season.releaseDate())
                        .episodes(toEpisodeDtos(season.episodes()))
                        .build())
                .toList();
    }

    private List<ContentDetailsDto.EpisodeDto> toEpisodeDtos(List<SeasonApiDto.EpisodeApiDto> episodeApiDtos) {
        return episodeApiDtos.stream()
                .map(episode -> ContentDetailsDto.EpisodeDto.builder()
                        .episodeNumber(episode.episodeNumber())
                        .overview(episode.overview())
                        .name(episode.name())
                        .runtime(episode.runtime())
                        .stillPath(episode.stillPath())
                        .build())
                .toList();
    }
}
