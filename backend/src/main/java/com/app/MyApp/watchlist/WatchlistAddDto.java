package com.app.MyApp.watchlist;

import com.app.MyApp.content.ContentType;
import jakarta.annotation.Nullable;

public record WatchlistAddDto(
        Integer contentId,
        ContentType contentType,
        WatchlistStatus status,

        @Nullable
        Double userRating
) {
}
