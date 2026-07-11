package com.app.MyApp.watchlist;

import jakarta.annotation.Nullable;

public record WatchlistUpdateDto(
        Integer id,
        WatchlistStatus status,

        @Nullable
        Double userRating
) {
}
