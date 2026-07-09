export const defaultFilterPayload: FilterPayload = {
  genres: [],
  contentType: "all",
  country: "",
  providers: [],
  watchOptions: ["flatrate"],
  minRating: 1,
  yearRange: [1970, new Date().getFullYear()],
};

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
