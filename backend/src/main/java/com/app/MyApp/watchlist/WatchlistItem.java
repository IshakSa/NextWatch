package com.app.MyApp.watchlist;

import com.app.MyApp.content.ContentType;
import com.app.MyApp.user.User;
import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import lombok.*;

@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class WatchlistItem {
    @Id
    @GeneratedValue
    private Integer id;

    private WatchlistStatus status;

    private long addedTimestamp;

    @Nullable
    private Long watchedTimestamp;

    @Nullable
    private Double userRating;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    private Integer contentId;
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
