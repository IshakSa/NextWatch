package me.nextwatch.NextWatch.watchlist;

import jakarta.annotation.Nullable;

public record WatchlistUpdateDto(
        Integer id, WatchlistStatus status, @Nullable Double userRating) {}
