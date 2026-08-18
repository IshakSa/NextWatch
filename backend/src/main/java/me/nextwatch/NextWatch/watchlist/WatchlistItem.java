package me.nextwatch.NextWatch.watchlist;

import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import lombok.*;
import me.nextwatch.NextWatch.content.Content;
import me.nextwatch.NextWatch.user.User;

import java.time.Instant;

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

    @Nullable
    private Instant addedTimestamp;

    @Nullable
    private Instant watchedTimestamp;

    @Nullable
    private Double userRating;

    @ManyToOne
    @MapsId("userId")
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @MapsId("embeddedContentId")
    @JoinColumns({@JoinColumn(name = "content_id"), @JoinColumn(name = "content_type")})
    private Content content;

    @PrePersist
    @PreUpdate
    public void onPrePersistPreUpdate() {
        validateRatingAdded();
        handleTimestamp();
    }

    private void validateRatingAdded() {
        if (this.status == WatchlistStatus.WATCHED && userRating == null) {
            throw new IllegalStateException("User rating can't be null");
        } else if (this.status == WatchlistStatus.SAVED && userRating != null) {
            throw new IllegalStateException("User can't rate yet");
        }
    }

    private void handleTimestamp() {
        Instant now = Instant.now();
        if (this.status == WatchlistStatus.SAVED && this.addedTimestamp == null) {
            this.addedTimestamp = now;
        } else if (this.status == WatchlistStatus.WATCHED && this.watchedTimestamp == null) {
            // If added directly as WATCHED (bypassing SAVED), initialize the added timestamp too
            if (this.addedTimestamp == null) {
                this.addedTimestamp = now;
            }

            this.watchedTimestamp = now;
        }
    }

    public Long getSavedEpochSecond() {
        return toEpochSecond(this.addedTimestamp);
    }

    public Long getWatchedEpochSecond() {
        return toEpochSecond(this.watchedTimestamp);
    }

    private Long toEpochSecond(Instant instant) {
        return instant != null ? instant.getEpochSecond() : null;
    }
}
