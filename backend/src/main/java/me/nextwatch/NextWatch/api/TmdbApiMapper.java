package me.nextwatch.NextWatch.api;

import jakarta.annotation.Nullable;
import me.nextwatch.NextWatch.api.dtos.ContentSummaryApiDto;
import me.nextwatch.NextWatch.api.dtos.ProvidersApiDto;
import me.nextwatch.NextWatch.api.dtos.SeasonApiDto;
import me.nextwatch.NextWatch.content.ContentType;
import me.nextwatch.NextWatch.content.dtos.ContentDetailsDto;
import me.nextwatch.NextWatch.content.dtos.ContentSummaryDto;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static me.nextwatch.NextWatch.Utils.executeIfNonNullElseNull;

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
            ContentSummaryApiDto apiDto, ContentType contentType, @Nullable List<SeasonApiDto> seasonApiDtos) {
        List<String> genres = genreProviderService.getGenres(apiDto.resolveGenreIds(), contentType);

        String trailerId = executeIfNonNullElseNull(apiDto.trailers(), () -> {
            assert apiDto.trailers() != null;
            return apiDto.trailers().getTrailerId();
        });

        ContentDetailsDto.CreditsDto credits =
                executeIfNonNullElseNull(apiDto.credits(), () -> getCreditsDto(apiDto, contentType));

        Map<String, ContentDetailsDto.ProviderOptionsDto> providers =
                executeIfNonNullElseNull(apiDto.providers(), () -> getProviders(apiDto));

        List<ContentSummaryDto> similar = executeIfNonNullElseNull(apiDto.similar(), () -> {
            assert apiDto.similar() != null;
            return toContentSummaryDtoList(apiDto.similar().results(), contentType);
        });

        List<ContentDetailsDto.SeasonDto> seasons =
                executeIfNonNullElseNull(seasonApiDtos, () -> getSeasons(seasonApiDtos));

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
        final int MAX_CREDIT_ITEMS = 10;
        List<ContentDetailsDto.ActorDto> cast = apiDto.credits().cast().stream()
                .map(castItem -> ContentDetailsDto.ActorDto.builder()
                        .name(castItem.name())
                        .profilePath(castItem.profilePath())
                        .character(castItem.character())
                        .order(castItem.order())
                        .build())
                .toList();
        if (cast.size() > MAX_CREDIT_ITEMS) {
            cast = cast.subList(0, MAX_CREDIT_ITEMS);
        }

        List<ContentDetailsDto.DirectorDto> directors;
        if (contentType.equals(ContentType.TV) && apiDto.creatorsDto() != null) {
            directors = apiDto.creatorsDto().stream()
                    .map(creator -> ContentDetailsDto.DirectorDto.builder()
                            .name(creator.name())
                            .profilePath(creator.profilePath())
                            .build())
                    .toList();
        } else {
            directors = apiDto.credits().crew().stream()
                    .filter(crewItem -> crewItem.job().equals("Direct" + "or"))
                    .map(crewItem -> ContentDetailsDto.DirectorDto.builder()
                            .name(crewItem.name())
                            .profilePath(crewItem.profilePath())
                            .build())
                    .toList();
        }

        if (directors.size() > MAX_CREDIT_ITEMS) {
            directors = directors.subList(0, MAX_CREDIT_ITEMS);
        }

        return ContentDetailsDto.CreditsDto.builder()
                .cast(cast)
                .directors(directors)
                .build();
    }

    private Map<String, ContentDetailsDto.ProviderOptionsDto> getProviders(ContentSummaryApiDto apiDto) {
        Map<String, ContentDetailsDto.ProviderOptionsDto> providers = new HashMap<>();
        apiDto.providers()
                .providers()
                .forEach((countryCode, optionsDto) -> providers.put(
                        countryCode,
                        ContentDetailsDto.ProviderOptionsDto.builder()
                                .flatrate(mapList(optionsDto.flatrate()))
                                .rent(mapList(optionsDto.rent()))
                                .buy(mapList(optionsDto.buy()))
                                .build()));

        return providers;
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

    private List<ContentDetailsDto.SeasonDto> getSeasons(List<SeasonApiDto> seasonApiDtos) {
        List<ContentDetailsDto.SeasonDto> seasons = null;
        if (seasonApiDtos != null) {
            seasons = seasonApiDtos.stream()
                    .map(season -> ContentDetailsDto.SeasonDto.builder()
                            .seasonNumber(season.seasonNumber())
                            .releaseDate(season.releaseDate())
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
        return seasons;
    }
}
