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

        watchlist.parallelStream().forEach(watchlistItem -> {
            ContentSummaryDto contentItem =
                    contentService.getSummary(watchlistItem.getId().getEmbeddedContentId(), false);

            if (watchlistItem.getStatus().equals(WatchlistStatus.SAVED)) {
                SavedItem savedItem = SavedItem.builder()
                        .contentItem(contentItem)
                        .addedTimestamp(watchlistItem.getSavedEpochSecond())
                        .build();
                saved.add(savedItem);
            } else {
                WatchedItem watchedItem = WatchedItem.builder()
                        .contentItem(contentItem)
                        .watchedTimestamp(watchlistItem.getWatchedEpochSecond())
                        .userRating(watchlistItem.getUserRating())
                        .build();
                watched.add(watchedItem);
            }
        });

        return WatchlistDto.builder().saved(saved).watched(watched).build();
    }
}
