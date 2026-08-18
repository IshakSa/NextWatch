package me.nextwatch.NextWatch.watchlist;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import me.nextwatch.NextWatch.content.ContentId;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Embeddable
public class WatchlistItemId implements Serializable {
    private Integer userId;
    private ContentId embeddedContentId;
}
