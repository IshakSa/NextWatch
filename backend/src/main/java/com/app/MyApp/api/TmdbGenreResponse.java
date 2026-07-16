package com.app.MyApp.api;

import java.util.List;

public record TmdbGenreResponse(
    List<GenreItem> genres
) {
    public record GenreItem(Integer id, String name) {
    }
}
