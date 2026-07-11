import { ContentItem } from "./content";

export interface UserWatchlist {
  saved: WatchlistItem[];
  watched: WatchedItem[];
}

export type WatchlistItem = ContentItem & {
  addedTimestamp: number;
};

export type WatchedItem = ContentItem & {
  userRating: number;
  watchedTimestamp: number;
};
