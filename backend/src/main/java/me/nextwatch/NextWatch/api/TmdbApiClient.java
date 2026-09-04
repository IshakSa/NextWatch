package me.nextwatch.NextWatch.api;

import me.nextwatch.NextWatch.api.dtos.ContentSummaryApiDto;
import me.nextwatch.NextWatch.api.dtos.SeasonApiDto;
import me.nextwatch.NextWatch.api.dtos.TmdbGenreResponse;
import me.nextwatch.NextWatch.api.dtos.TmdbPageResponse;
import me.nextwatch.NextWatch.config.FeignConfig;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import java.time.LocalDate;

@FeignClient(name = "tmdbApi", url = "https://api.themoviedb.org/3", configuration = FeignConfig.class)
public interface TmdbApiClient {

    @GetMapping("/{contentType}/{id}")
    ContentSummaryApiDto getContentDetails(
            @PathVariable String contentType,
            @PathVariable Integer id,
            @RequestParam("append_to_response") String appendToResponse);

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

    @GetMapping("/tv/{id}/season/{seasonNumber}")
    SeasonApiDto getSeason(@PathVariable Integer id, @PathVariable int seasonNumber);

    @GetMapping("/search/multi")
    TmdbPageResponse<ContentSummaryApiDto> search(@RequestParam String query);
}
