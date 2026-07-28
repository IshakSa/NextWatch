package me.nextwatch.NextWatch.watchlist;

import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import lombok.*;
import me.nextwatch.NextWatch.content.ContentType;
import me.nextwatch.NextWatch.user.User;

@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class WatchlistItem {
    @EmbeddedId
    private WatchlistItemId id;

    private WatchlistStatus status;

    // TODO: fix timestamp
    private long addedTimestamp;

    @Nullable
    private Long watchedTimestamp;

    @Nullable
    private Double userRating;

    @ManyToOne
    @MapsId("userId")
    @JoinColumn(name = "user_id")
    private User user;

    private ContentType contentType;

    @PrePersist
    @PreUpdate
    public void validateRatingAdded() {
        if (this.status == WatchlistStatus.WATCHED && userRating == null) {
            throw new IllegalStateException("User rating can't be null");
        } else if (this.status == WatchlistStatus.SAVED && userRating != null) {
            throw new IllegalStateException("User can't rate yet");
        }
    }
}
