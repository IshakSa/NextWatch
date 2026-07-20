package me.nextwatch.NextWatch.api;

import me.nextwatch.NextWatch.config.FeignConfig;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import java.time.LocalDate;

@FeignClient(name = "tmdbApi", url = "https://api.themoviedb.org/3", configuration = FeignConfig.class)
public interface TmdbApiClient {

    // TODO: Set to enum value again
    @GetMapping("/{contentType}/{id}")
    ContentSummaryApiDto getContentByTypeAndById(@PathVariable Integer id, @PathVariable String contentType);

    // TODO: Set to enum value again
    @GetMapping("/{contentType}/top_rated")
    TmdbPageResponse<ContentSummaryApiDto> getTopRated(@PathVariable String contentType);

    @GetMapping("/discover/movie?sort_by=popularity.desc&with_release_type=2|3")
    TmdbPageResponse<ContentSummaryApiDto> getUpcoming(
            @RequestParam("primary_release_date.gte") LocalDate gteDate,
            @RequestParam("primary_release_date.lte") LocalDate lteDate);

    // TODO: Set to enum value again
    @GetMapping("/genre/{contentType}/list")
    TmdbGenreResponse getGenres(@PathVariable String contentType);

    // TODO: Set to enum value (TimeWindow)
    @GetMapping("/trending/all/{timeWindow}")
    TmdbPageResponse<ContentSummaryApiDto> getTrending(@PathVariable String timeWindow);

    // TODO: Set to enum value again
    @GetMapping("/{contentType}/{id}")
    ContentRuntimeDto getContentRuntime(@PathVariable String contentType, @PathVariable Integer id);

    // TODO: Set to enum value again
    @GetMapping("/{contentType}/{id}")
    ContentSummaryApiDto getDetails(@PathVariable String contentType, @PathVariable Integer id);

    @GetMapping("/{contentType}/{id}/videos")
    ContentTrailerApiDto getTrailers(@PathVariable String contentType, @PathVariable Integer id);

    @GetMapping("/{contentType}/{id}/credits")
    CreditsApiDto getCredits(@PathVariable String contentType, @PathVariable Integer id);

    @GetMapping("/{contentType}/{id}/watch/providers")
    ProvidersApiDto getProviders(@PathVariable String contentType, @PathVariable Integer id);

    @GetMapping("/tv/{id}/season/{seasonNumber}")
    SeasonApiDto getSeason(@PathVariable Integer id, @PathVariable int seasonNumber);

    @GetMapping("/{contentType}/{id}/recommendations")
    TmdbPageResponse<ContentSummaryApiDto> getSimilar(@PathVariable String contentType, @PathVariable Integer id);

    @GetMapping("/search/multi")
    TmdbPageResponse<ContentSummaryApiDto> search(@RequestParam String query);
}
