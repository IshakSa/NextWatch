package com.app.MyApp.config;

import feign.RequestInterceptor;
import feign.RequestTemplate;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;

public class FeignAuthConfiguration {

    private final String tmdbApiKey;

    public FeignAuthConfiguration(@Value("${TMDB_API_KEY}") String tmdbApiKey) {
        this.tmdbApiKey = tmdbApiKey;
    }

    @Bean
    public RequestInterceptor requestInterceptor() {
        return (RequestTemplate requestTemplate) -> {
            requestTemplate.header("Authorization", "Bearer " + tmdbApiKey);
        };
    }
}
