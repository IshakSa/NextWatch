package com.app.MyApp.api;

import com.app.MyApp.config.FeignAuthConfiguration;
import com.app.MyApp.content.ContentSummaryApiDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "tmdbApi", url = "https://api.themoviedb.org/3", configuration = FeignAuthConfiguration.class)
public interface TmdbApiClient {

    // TODO: Set to enum value again
    @GetMapping("/{contentType}/{id}")
    ContentSummaryApiDto getContentByTypeAndById(@PathVariable Integer id, @PathVariable String contentType);

    // TODO: Set to enum value again
    @GetMapping("/{contentType}/top_rated")
    TmdbPageResponse<ContentSummaryApiDto> getTopRated(@PathVariable String contentType);

    // TODO: Set to enum value again
    @GetMapping("/genre/{contentType}/list")
    TmdbGenreResponse getGenres(@PathVariable String contentType);

    // TODO: Set to enum value (TimeWindow)
    @GetMapping("/trending/all/{timeWindow}")
    TmdbPageResponse<ContentSummaryApiDto> getTrending(@PathVariable String timeWindow);

    // TODO: Set to enum value again
    @GetMapping("/{contentType}/{id}")
    ContentRuntimeDto getContentRuntime(@PathVariable String contentType, @PathVariable Integer id);
}
