package com.app.MyApp.watchlist;

import com.app.MyApp.content.ContentSummaryDto;
import com.fasterxml.jackson.annotation.JsonUnwrapped;
import lombok.Builder;

import java.util.List;

@Builder
public record WatchlistDto(List<SavedItem> saved, List<WatchedItem> watched) {

    @Builder
    public record SavedItem(@JsonUnwrapped ContentSummaryDto contentItem, long addedTimestamp) {}

    @Builder
    public record WatchedItem(@JsonUnwrapped ContentSummaryDto contentItem, double userRating, long watchedTimestamp) {}
}
