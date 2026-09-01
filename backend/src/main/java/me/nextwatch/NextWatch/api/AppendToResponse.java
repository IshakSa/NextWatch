package me.nextwatch.NextWatch.api;

// ! When adding a new enum value:
// update "appendToResponseMap" in "TmdbApiService" to include the new enum value for mapping it to a tmdb endpoint
// exception: SEASONS, it is fetched separately, but uses the "AppendToResponse Enum value" so you can still define to
// add the seasons easily inside the "AppendToResponse list" when calling the "TmdbApiService"
public enum AppendToResponse {
    TRAILERS,
    CREDITS,
    WATCH_PROVIDERS,
    RECOMMENDATIONS,
    SEASONS
}
