package com.app.MyApp.watchlist;

import com.fasterxml.jackson.annotation.JsonProperty;

public enum WatchlistStatus {
    @JsonProperty("saved") SAVED,
    @JsonProperty("watched") WATCHED
}
