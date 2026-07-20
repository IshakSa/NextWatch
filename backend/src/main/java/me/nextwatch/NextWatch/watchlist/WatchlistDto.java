package me.nextwatch.NextWatch.watchlist;

import com.fasterxml.jackson.annotation.JsonUnwrapped;
import lombok.Builder;
import me.nextwatch.NextWatch.content.ContentSummaryDto;

import java.util.List;

@Builder
public record WatchlistDto(List<SavedItem> saved, List<WatchedItem> watched) {

    @Builder
    public record SavedItem(@JsonUnwrapped ContentSummaryDto contentItem, long addedTimestamp) {}

    @Builder
    public record WatchedItem(@JsonUnwrapped ContentSummaryDto contentItem, double userRating, long watchedTimestamp) {}
}
