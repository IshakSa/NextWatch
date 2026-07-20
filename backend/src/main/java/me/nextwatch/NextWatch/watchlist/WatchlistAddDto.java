package me.nextwatch.NextWatch.watchlist;

import jakarta.annotation.Nullable;
import me.nextwatch.NextWatch.content.ContentType;

public record WatchlistAddDto(
        Integer contentId,
        ContentType contentType,
        WatchlistStatus status,

        @Nullable Double userRating) {}
