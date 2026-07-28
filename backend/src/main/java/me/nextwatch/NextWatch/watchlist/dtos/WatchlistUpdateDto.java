package me.nextwatch.NextWatch.watchlist.dtos;

import jakarta.annotation.Nullable;
import me.nextwatch.NextWatch.watchlist.WatchlistStatus;

public record WatchlistUpdateDto(
        Integer id, WatchlistStatus status, @Nullable Double userRating) {}
