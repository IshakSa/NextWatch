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

interface BasePerson {
  name: string;
  profilePath: string;
}

export interface Actor extends BasePerson {
  character: string;
  order: number;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface Director extends BasePerson {}

export interface Credits {
  cast: Actor[];
  directors: Director[];
}

export interface Providers {
  [countryCode: string]: ProviderOptions;
}

export interface ProviderOptions {
  rent?: ProviderInfo[];
  flatrate?: ProviderInfo[];
  buy?: ProviderInfo[];
}

export interface ProviderInfo {
  logoPath: string;
  providerId: number;
  providerName: string;
  displayPriority: number;
}

export interface Season {
  seasonNumber: number;
  episodes: Episode[];
}

export interface Episode {
  episodeNumber: number;
  overview: string;
  name: string;
  runtime: number;
  stillPath: string;
}

export const ImageSizes = {
  hero: 1920,
  poster: 500,
  backdrop: 500,
  still: 500,
  provider: 154,
  credits: 185,
} as const;
