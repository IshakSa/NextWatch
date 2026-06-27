import { Credits } from "./credits";
import { Providers } from "./providers";
import { Season } from "./season";

export interface ContentItem {
  id: number;
  title: string;
  genres: string[];
  type: "movie" | "tv";
  overview: string;
  length: number;
  rating: number;
  releaseDate: string;
  posterPath: string;
  backdropPath: string;
  trailerId?: string;
}

export interface ContentItemDetails extends ContentItem {
  providers: Providers;
  credits: Credits;
  seasons?: Season[];
  similar?: ContentItem[];
}