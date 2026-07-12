package com.app.MyApp.api;

import com.app.MyApp.content.ContentType;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class GenreProviderService {
    private final Map<Integer, String> movieGenres;
    private final Map<Integer, String> tvGenres;

    public GenreProviderService(TmdbApiClient tmdbApiClient) {
        TmdbGenreResponse movieGenreResponse = tmdbApiClient.getGenres(ContentType.MOVIE.toLower());
        TmdbGenreResponse tvGenreResponse = tmdbApiClient.getGenres(ContentType.MOVIE.toLower());

        movieGenres = toMap(movieGenreResponse);
        tvGenres = toMap(tvGenreResponse);
    }

    private Map<Integer, String> toMap(TmdbGenreResponse genreResponse) {
        Map<Integer, String> genreMap = new HashMap<>();
        genreResponse.genres().forEach(genre -> genreMap.put(genre.id(), genre.name()));
        return genreMap;
    }

    public List<String> getGenres(List<Integer> genreIds, ContentType contentType) {
        int MAX_GENRES = 2;
        Map<Integer, String> selectedGenre = contentType.equals(ContentType.MOVIE) ? movieGenres : tvGenres;

        List<String> genres = genreIds.stream()
                .filter(selectedGenre::containsKey)
                .map(selectedGenre::get)
                .toList();

        if (genres.size() > MAX_GENRES) {
            return genres.subList(0, MAX_GENRES);
        }
        return genres;
    }
}
