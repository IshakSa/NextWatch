"use server";

import { ContentType } from "@/types";
import { request } from "@/lib/requestHandler";

export async function addWatchlist(contentId: number, contentType: ContentType) {
  await request("/api/watchlist", "add to watchlist failed", {
    method: "POST",
    body: JSON.stringify({ contentId, contentType, status: "saved" }),
  });
}

export async function addWatched(contentId: number, contentType: ContentType, userRating: number) {
  await request("/api/watchlist", "mark as watched failed", {
    method: "POST",
    body: JSON.stringify({ contentId, contentType, status: "watched", userRating }),
  });
}

export async function removeWatchlist(contentId: number) {
  await request(`/api/watchlist/${contentId}`, "deleting from watchlist failed", {
    method: "DELETE",
  });
}
