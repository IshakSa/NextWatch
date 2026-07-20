package me.nextwatch.NextWatch.watchlist;

import com.fasterxml.jackson.annotation.JsonProperty;

public enum WatchlistStatus {
    @JsonProperty("saved")
    SAVED,
    @JsonProperty("watched")
    WATCHED,
    @JsonProperty("none")
    NONE,
}
