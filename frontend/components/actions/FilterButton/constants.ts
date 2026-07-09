import { AvailableProviders } from "@/types";

export const defaultFilterPayload: FilterPayload = {
  genres: [],
  contentType: "all",
  country: "",
  providers: [],
  watchOptions: ["flatrate"],
  minRating: 1,
  yearRange: [1970, new Date().getFullYear()],
};

// TODO: get this data from backend
export const AVAILABLE_PROVIDERS: AvailableProviders = {
  US: [
    {
      providerId: 8,
      providerName: "Netflix",
      logoPath: "/p199r4w7u68v6z2v8u1m6s5z4v3.jpg",
      displayPriority: 1,
    },
    {
      providerId: 9,
      providerName: "Amazon Prime",
      logoPath: "/m6s5z4v3p199r4w7u68v6z2v8u1.jpg",
      displayPriority: 2,
    },
    {
      providerId: 337,
      providerName: "Disney+",
      logoPath: "/v8u1m6s5z4v3p199r4w7u68v6z2.jpg",
      displayPriority: 3,
    },
    {
      providerId: 15,
      providerName: "Hulu",
      logoPath: "/zxrVdFjIjLqkfnwyghnfywTn3Lh.jpg",
      displayPriority: 4,
    },
  ],
  DE: [
    {
      providerId: 8,
      providerName: "Netflix",
      logoPath: "/p199r4w7u68v6z2v8u1m6s5z4v3.jpg",
      displayPriority: 1,
    },
    {
      providerId: 9,
      providerName: "Amazon Prime",
      logoPath: "/m6s5z4v3p199r4w7u68v6z2v8u1.jpg",
      displayPriority: 2,
    },
    {
      providerId: 337,
      providerName: "Disney+",
      logoPath: "/v8u1m6s5z4v3p199r4w7u68v6z2.jpg",
      displayPriority: 3,
    },
  ],
  GB: [
    {
      providerId: 8,
      providerName: "Netflix",
      logoPath: "/p199r4w7u68v6z2v8u1m6s5z4v3.jpg",
      displayPriority: 1,
    },
    {
      providerId: 9,
      providerName: "Amazon Prime",
      logoPath: "/m6s5z4v3p199r4w7u68v6z2v8u1.jpg",
      displayPriority: 2,
    },
    {
      providerId: 337,
      providerName: "Disney+",
      logoPath: "/v8u1m6s5z4v3p199r4w7u68v6z2.jpg",
      displayPriority: 3,
    },
  ],
  FR: [
    {
      providerId: 8,
      providerName: "Netflix",
      logoPath: "/p199r4w7u68v6z2v8u1m6s5z4v3.jpg",
      displayPriority: 1,
    },
    {
      providerId: 9,
      providerName: "Amazon Prime",
      logoPath: "/m6s5z4v3p199r4w7u68v6z2v8u1.jpg",
      displayPriority: 2,
    },
    {
      providerId: 337,
      providerName: "Disney+",
      logoPath: "/v8u1m6s5z4v3p199r4w7u68v6z2.jpg",
      displayPriority: 3,
    },
  ],
  IT: [
    {
      providerId: 8,
      providerName: "Netflix",
      logoPath: "/p199r4w7u68v6z2v8u1m6s5z4v3.jpg",
      displayPriority: 1,
    },
    {
      providerId: 9,
      providerName: "Amazon Prime",
      logoPath: "/m6s5z4v3p199r4w7u68v6z2v8u1.jpg",
      displayPriority: 2,
    },
    {
      providerId: 337,
      providerName: "Disney+",
      logoPath: "/v8u1m6s5z4v3p199r4w7u68v6z2.jpg",
      displayPriority: 3,
    },
  ],
  ES: [
    {
      providerId: 8,
      providerName: "Netflix",
      logoPath: "/p199r4w7u68v6z2v8u1m6s5z4v3.jpg",
      displayPriority: 1,
    },
    {
      providerId: 9,
      providerName: "Amazon Prime",
      logoPath: "/m6s5z4v3p199r4w7u68v6z2v8u1.jpg",
      displayPriority: 2,
    },
    {
      providerId: 337,
      providerName: "Disney+",
      logoPath: "/v8u1m6s5z4v3p199r4w7u68v6z2.jpg",
      displayPriority: 3,
    },
  ],
  PT: [
    {
      providerId: 8,
      providerName: "Netflix",
      logoPath: "/p199r4w7u68v6z2v8u1m6s5z4v3.jpg",
      displayPriority: 1,
    },
    {
      providerId: 9,
      providerName: "Amazon Prime",
      logoPath: "/m6s5z4v3p199r4w7u68v6z2v8u1.jpg",
      displayPriority: 2,
    },
    {
      providerId: 337,
      providerName: "Disney+",
      logoPath: "/v8u1m6s5z4v3p199r4w7u68v6z2.jpg",
      displayPriority: 3,
    },
  ],
  CH: [
    {
      providerId: 8,
      providerName: "Netflix",
      logoPath: "/p199r4w7u68v6z2v8u1m6s5z4v3.jpg",
      displayPriority: 1,
    },
    {
      providerId: 9,
      providerName: "Amazon Prime",
      logoPath: "/m6s5z4v3p199r4w7u68v6z2v8u1.jpg",
      displayPriority: 2,
    },
    {
      providerId: 337,
      providerName: "Disney+",
      logoPath: "/v8u1m6s5z4v3p199r4w7u68v6z2.jpg",
      displayPriority: 3,
    },
  ],
  AT: [
    {
      providerId: 8,
      providerName: "Netflix",
      logoPath: "/p199r4w7u68v6z2v8u1m6s5z4v3.jpg",
      displayPriority: 1,
    },
    {
      providerId: 9,
      providerName: "Amazon Prime",
      logoPath: "/m6s5z4v3p199r4w7u68v6z2v8u1.jpg",
      displayPriority: 2,
    },
    { providerId: 150, providerName: "Sky X", logoPath: "/skyx-logo-path.jpg", displayPriority: 3 },
  ],
  DK: [
    {
      providerId: 8,
      providerName: "Netflix",
      logoPath: "/p199r4w7u68v6z2v8u1m6s5z4v3.jpg",
      displayPriority: 1,
    },
    {
      providerId: 9,
      providerName: "Amazon Prime",
      logoPath: "/m6s5z4v3p199r4w7u68v6z2v8u1.jpg",
      displayPriority: 2,
    },
    {
      providerId: 337,
      providerName: "Disney+",
      logoPath: "/v8u1m6s5z4v3p199r4w7u68v6z2.jpg",
      displayPriority: 3,
    },
  ],
  SE: [
    {
      providerId: 8,
      providerName: "Netflix",
      logoPath: "/p199r4w7u68v6z2v8u1m6s5z4v3.jpg",
      displayPriority: 1,
    },
    {
      providerId: 9,
      providerName: "Amazon Prime",
      logoPath: "/m6s5z4v3p199r4w7u68v6z2v8u1.jpg",
      displayPriority: 2,
    },
    {
      providerId: 337,
      providerName: "Disney+",
      logoPath: "/v8u1m6s5z4v3p199r4w7u68v6z2.jpg",
      displayPriority: 3,
    },
  ],
};

// TODO: get this data from backend
export const genres = [
  "Action",
  "Comedy",
  "Documentary",
  "Drama",
  "Fantasy",
  "Horror",
  "Romance",
  "Sci-Fi",
  "Thriller",
] as const;

export interface FilterPayload {
  genres: string[];
  contentType: TypeValue;
  country: string;
  providers: number[];
  watchOptions: WatchOptions;
  minRating: number;
  yearRange: number[];
}

export type TypeValue = "all" | "movies" | "series";
export type WatchOptions = ("flatrate" | "rent" | "buy")[];
