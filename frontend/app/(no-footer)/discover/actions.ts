"use server";

import { ContentItem } from "@/types";
import { request } from "@/lib/requestHandler";

export default async function fetchNextRecommendations(seenContentIds: number[]) {
  const content: ContentItem[] = await request(
    `/api/user/recommendations?limit=10&seenContentIds=${seenContentIds}`,
    "couldn't fetch data",
  );
  return content;
}
