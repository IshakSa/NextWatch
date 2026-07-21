package me.nextwatch.NextWatch.watchlist;

import me.nextwatch.NextWatch.content.ContentService;
import me.nextwatch.NextWatch.content.dtos.ContentSummaryDto;
import me.nextwatch.NextWatch.watchlist.dtos.WatchlistDto;
import me.nextwatch.NextWatch.watchlist.dtos.WatchlistDto.SavedItem;
import me.nextwatch.NextWatch.watchlist.dtos.WatchlistDto.WatchedItem;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class WatchlistMapper {
    private final ContentService contentService;

    public WatchlistMapper(ContentService contentService) {
        this.contentService = contentService;
    }

    public WatchlistDto toWatchlistDto(List<WatchlistItem> watchlist) {
        List<SavedItem> saved = new ArrayList<>();
        List<WatchedItem> watched = new ArrayList<>();

        watchlist.forEach(watchlistItem -> {
            ContentSummaryDto contentItem = contentService.getContentByIdAndByType(
                    watchlistItem.getId().getContentId(), watchlistItem.getContentType());

            if (watchlistItem.getStatus().equals(WatchlistStatus.SAVED)) {
                SavedItem savedItem = SavedItem.builder()
                        .contentItem(contentItem)
                        .addedTimestamp(System.currentTimeMillis())
                        .build();
                saved.add(savedItem);
            } else {
                WatchedItem watchedItem = WatchedItem.builder()
                        .contentItem(contentItem)
                        .watchedTimestamp(System.currentTimeMillis())
                        .userRating(watchlistItem.getUserRating())
                        .build();
                watched.add(watchedItem);
            }
        });

        return WatchlistDto.builder().saved(saved).watched(watched).build();
    }
}
