package com.app.MyApp.watchlist;

import com.app.MyApp.content.ContentService;
import com.app.MyApp.content.ContentSummaryDto;
import com.app.MyApp.watchlist.WatchlistDto.SavedItem;
import com.app.MyApp.watchlist.WatchlistDto.WatchedItem;
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
            ContentSummaryDto contentItem = contentService.getContentByIdAndByType(watchlistItem.getContentId(),
                    watchlistItem.getContentType());

            if (watchlistItem.getStatus().equals(WatchlistStatus.SAVED)) {
                SavedItem savedItem = SavedItem.builder().contentItem(contentItem)
                        .addedTimestamp(System.currentTimeMillis())
                        .watchlistItemId(watchlistItem.getId())
                        .build();
                saved.add(savedItem);
            } else {
                WatchedItem watchedItem =
                        WatchedItem.builder().contentItem(contentItem).watchedTimestamp(System.currentTimeMillis()).userRating(watchlistItem.getUserRating()).watchlistItemId(watchlistItem.getId()).build();
                watched.add(watchedItem);
            }
        });

        // SavedItem savedItem = tmdbApiClient.getContentByTypeAndById(null, null)
        return WatchlistDto.builder().saved(saved).watched(watched).build();
    }
}
