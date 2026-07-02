import WatchlistCard from "@/components/carousel/ContentCarousel/_components/WatchlistCard";
import { ContentItem } from "@/types";
import React from "react";

export default function WatchGrid({
  displayedContent,
  deleteContentItemById,
}: {
  displayedContent: ContentItem[];
  deleteContentItemById: (contentItemId: number) => void;
}) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-6">
      {displayedContent.map((contentItem, index) => (
        <div key={index} className="cursor-pointer">
          <WatchlistCard contentItem={contentItem} deleteContentItemById={deleteContentItemById} />
        </div>
      ))}
    </div>
  );
}
