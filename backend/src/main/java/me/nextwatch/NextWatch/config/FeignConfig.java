package me.nextwatch.NextWatch.config;

import feign.RequestInterceptor;
import feign.RequestTemplate;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;

public class FeignConfig {

    private final String tmdbApiKey;

    public FeignConfig(@Value("${TMDB_API_KEY}") String tmdbApiKey) {
        this.tmdbApiKey = tmdbApiKey;
    }

    @Bean
    public RequestInterceptor requestInterceptor() {
        return (RequestTemplate requestTemplate) -> {
            requestTemplate.header("Authorization", "Bearer " + tmdbApiKey);
        };
    }
}
