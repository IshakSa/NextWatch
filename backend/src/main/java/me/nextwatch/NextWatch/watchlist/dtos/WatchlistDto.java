package me.nextwatch.NextWatch.watchlist.dtos;

import com.fasterxml.jackson.annotation.JsonUnwrapped;
import lombok.Builder;
import me.nextwatch.NextWatch.content.dtos.ContentSummaryDto;

import java.util.List;

@Builder
public record WatchlistDto(List<SavedItem> saved, List<WatchedItem> watched) {

    @Builder
    public record SavedItem(@JsonUnwrapped ContentSummaryDto contentItem, Long addedTimestamp) {}

    @Builder
    public record WatchedItem(@JsonUnwrapped ContentSummaryDto contentItem, Double userRating, Long watchedTimestamp) {}
}
