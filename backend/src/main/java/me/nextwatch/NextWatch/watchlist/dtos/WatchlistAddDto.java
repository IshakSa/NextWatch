package me.nextwatch.NextWatch.watchlist.dtos;

import jakarta.annotation.Nullable;
import me.nextwatch.NextWatch.content.ContentType;
import me.nextwatch.NextWatch.watchlist.WatchlistStatus;

public record WatchlistAddDto(
        Integer contentId,
        ContentType contentType,
        WatchlistStatus status,

        @Nullable Double userRating) {}
