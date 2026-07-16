"use client";

import { capitalize } from "@/lib/utils";
import { useState } from "react";
import { Trash2Icon, Undo2Icon } from "lucide-react";
import { toast } from "sonner";
import TypeTabs, { ActiveType } from "./_components/TypeTabs";
import SortButton, { SortKey } from "./_components/SortButton";
import ExpandButton from "./_components/ExpandButton";
import WatchInfo from "./_components/WatchInfo";
import WatchGrid from "./_components/WatchGrid";
import { WatchedItem, WatchlistItem } from "@/types/user";
import ContentCarousel from "../carousel/ContentCarousel";
import {
  addWatched,
  addWatchlist,
  removeWatchlist,
} from "@/components/actions/WatchlistButtons/actions";

export type WatchTabType = "watchlist" | "watched";

export default function WatchTab({
  type,
  content,
}: {
  type: WatchTabType;
  content: WatchlistItem[] | WatchedItem[];
}) {
  const [activeType, setActiveType] = useState<ActiveType>("all");
  const [isExpanded, setIsExpanded] = useState(false);
  const [sortedBy, setSortedBy] = useState<SortKey>(
    type === "watchlist" ? "added-desc" : "watched-desc",
  );
  const [localContent, setLocalContent] = useState(content);

  async function deleteContentItemById(contentItemId: number) {
    const deletedContentItem = localContent.find((contentItem) => contentItem.id === contentItemId);

    if (!deletedContentItem) {
      return;
    }

    setLocalContent(
      localContent.filter((contentItem) => contentItem !== deletedContentItem) as
        WatchlistItem[] | WatchedItem[],
    );

    await removeWatchlist(deletedContentItem.id);

    displayDeletedAlert(deletedContentItem);
  }

  async function undoDeletion(deletedContentItem: WatchlistItem | WatchedItem) {
    setLocalContent((prev) => [...prev, deletedContentItem] as WatchlistItem[] | WatchedItem[]);

    if (type === "watched") {
      await addWatched(
        deletedContentItem.id,
        deletedContentItem.type,
        (deletedContentItem as WatchedItem).userRating,
      );
    } else {
      await addWatchlist(deletedContentItem.id, deletedContentItem.type);
    }
  }

  function displayDeletedAlert(deletedContentItem: WatchlistItem | WatchedItem) {
    const title = type === "watchlist" ? "Removed from Watchlist" : "Removed from Watched List";
    const undoTitle = type === "watchlist" ? "Restored to Watchlist" : "Restored to Watched List";

    const description = `"${deletedContentItem.title}" was removed.`;
    const undoDescription = `"${deletedContentItem.title}" is back on your list.`;

    toast(title, {
      icon: <Trash2Icon />,
      description: description,
      action: {
        label: "Undo",
        onClick: async () => {
          await undoDeletion(deletedContentItem);

          toast.success(undoTitle, {
            icon: <Undo2Icon />,
            description: undoDescription,
          });
        },
      },
    });
  }

  function getDisplayedContent() {
    let filteredContent;
    if (activeType === "all") {
      filteredContent = [...localContent];
    } else {
      filteredContent = localContent.filter((item) => item.type === activeType);
    }

    const compareNum = (a: number, b: number, desc = true) => (desc ? b - a : a - b);
    filteredContent.sort((itemA, itemB) => {
      switch (sortedBy) {
        case "added-desc":
          return compareNum(
            (itemA as WatchlistItem).addedTimestamp,
            (itemB as WatchlistItem).addedTimestamp,
          );

        case "watched-desc":
          return compareNum(
            (itemA as WatchedItem).watchedTimestamp,
            (itemB as WatchedItem).watchedTimestamp,
          );

        case "runtime-desc":
          return compareNum(itemA.length, itemB.length);

        case "personal-rating-desc":
          return compareNum((itemA as WatchedItem).userRating, (itemB as WatchedItem).userRating);
        case "rating-desc":
          return compareNum(itemA.rating, itemB.rating);

        case "title-asc":
          return itemA.title.localeCompare(itemB.title);

        case "release-desc":
          return new Date(itemB.releaseDate).getTime() - new Date(itemA.releaseDate).getTime();
      }
    });

    return filteredContent;
  }

  const displayedContent = getDisplayedContent() as WatchlistItem[] | WatchedItem[];

  return (
    <section className="mt-5 sm:mt-10">
      <h1>{capitalize(type)}</h1>
      <WatchInfo activeType={activeType} displayedContent={displayedContent} type={type} />

      <div className="sm:flex justify-between my-5">
        <TypeTabs
          activeType={activeType}
          setActiveType={setActiveType}
          setSortedBy={setSortedBy}
          sortedBy={sortedBy}
        />

        <div className="mt-3 sm:mt-0 flex flex-1 justify-between">
          <SortButton
            activeType={activeType}
            setSortedBy={setSortedBy}
            sortedBy={sortedBy}
            type={type}
          />

          <ExpandButton isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
        </div>
      </div>

      <div>
        {isExpanded ? (
          <WatchGrid
            displayedContent={displayedContent}
            deleteContentItemById={deleteContentItemById}
            type={type}
          />
        ) : (
          <ContentCarousel
            carouselType="watchlist"
            content={displayedContent}
            margin="mt-0"
            watchlistCardProps={{ type, deleteContentItemById }}
          />
        )}
      </div>
    </section>
  );
}
