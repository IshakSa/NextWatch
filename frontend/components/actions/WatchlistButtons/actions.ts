"use server";

import { ContentType } from "@/types";

export async function addWatchlist(contentId: number, contentType: ContentType) {
  const response = await fetch(`${process.env.BACKEND_URL}/api/watchlist`, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ contentId, contentType, status: "saved" }),
  });
  if (response.status !== 201) {
    throw new Error("add to watchlist failed");
  }
}

export async function addWatched(contentId: number, contentType: ContentType, userRating: number) {
  const response = await fetch(`${process.env.BACKEND_URL}/api/watchlist`, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ contentId, contentType, status: "watched", userRating }),
  });
  if (response.status !== 201) {
    throw new Error("mark as watched failed");
  }
}

export async function removeWatchlist(contentId: number) {
  const response = await fetch(`${process.env.BACKEND_URL}/api/watchlist/${contentId}`, {
    method: "DELETE",
    headers: { "Content-type": "application/json" },
  });
  if (!response.ok) {
    throw new Error("deleting from watchlist failed");
  }
}
