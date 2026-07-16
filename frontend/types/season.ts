export interface Season {
  seasonNumber: number;
  releaseDate: string;
  episodes: Episode[];
}

export interface Episode {
  episodeNumber: number;
  overview: string;
  name: string;
  runtime: number;
  stillPath: string;
}
