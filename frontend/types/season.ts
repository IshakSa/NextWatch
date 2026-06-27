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
