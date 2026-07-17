"use server";

import { request } from "@/lib/requestHandler";

export async function searchContent(search: string) {
  return await request(`/api/content/search?query=${search}`, "search failed");
}
