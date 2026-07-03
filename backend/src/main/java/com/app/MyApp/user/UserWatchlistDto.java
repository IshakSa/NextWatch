package com.app.MyApp.user;

import java.util.List;

import com.app.MyApp.content.ContentSummaryDto;
import com.fasterxml.jackson.annotation.JsonUnwrapped;

import lombok.Builder;

@Builder
public record UserWatchlistDto(
        List<WatchlistContentItem> watchlist,
        List<WatchedContentItem> watched) {

    @Builder
    public record WatchlistContentItem(@JsonUnwrapped ContentSummaryDto contentItem, long addedTimestamp) {
    }

    @Builder
    public record WatchedContentItem(@JsonUnwrapped ContentSummaryDto contentItem, int userRating,
            long watchedTimestamp) {
    }
}
