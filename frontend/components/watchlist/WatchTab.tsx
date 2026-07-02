"use client";

import { ContentItem } from "@/types";
import ContentCarousel from "../carousel/ContentCarousel/ContentCarousel";
import { capitalize } from "@/lib/utils";
import { useState } from "react";
import { Trash2Icon, Undo2Icon } from "lucide-react";
import { toast } from "sonner";
import TypeTabs, { ActiveType } from "./_components/TypeTabs";
import SortButton, { SortKey } from "./_components/SortButton";
import ExpandButton from "./_components/ExpandButton";
import WatchInfo from "./_components/WatchInfo";
import WatchGrid from "./_components/WatchGrid";

export default function WatchTab({
  type,
  content,
}: {
  type: "watchlist" | "watched";
  content: ContentItem[];
}) {
  const [activeType, setActiveType] = useState<ActiveType>("all");
  const [isExpanded, setIsExpanded] = useState(false);
  const [sortedBy, setSortedBy] = useState<SortKey>("added-desc");
  const [localContent, setLocalContent] = useState(content);

  function deleteContentItemById(contentItemId: number) {
    const deletedContentItem = localContent.find((contentItem) => contentItem.id === contentItemId);

    if (!deletedContentItem) {
      return;
    }

    setLocalContent(localContent.filter((contentItem) => contentItem !== deletedContentItem));

    // TODO: connect remove to backend

    displayDeletedAlert(deletedContentItem);
  }

  function displayDeletedAlert(deletedContentItem: ContentItem) {
    toast("Removed from watchlist", {
      icon: <Trash2Icon />,
      description: `"${deletedContentItem.title}" was removed.`,
      action: {
        label: "Undo",
        onClick: () => {
          setLocalContent((prev) => [...prev, deletedContentItem]);
          // TODO: connect undo to backend
          toast.success("Restored to watchlist", {
            icon: <Undo2Icon />,
            description: `"${deletedContentItem.title}" is back on your list.`,
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

    switch (sortedBy) {
      case "added-desc": // TODO
        break;

      case "added-asc": // TODO
        break;

      case "rating-desc":
        filteredContent.sort((itemA, itemB) => itemB.rating - itemA.rating);
        break;

      case "release-desc":
        filteredContent.sort(
          (itemA, itemB) =>
            new Date(itemB.releaseDate).getTime() - new Date(itemA.releaseDate).getTime(),
        );
        break;

      case "runtime-desc":
        filteredContent.sort((itemA, itemB) => itemB.length - itemA.length);
        break;

      case "runtime-asc":
        filteredContent.sort((itemA, itemB) => itemA.length - itemB.length);
        break;

      case "title-asc":
        filteredContent.sort((itemA, itemB) => itemA.title.localeCompare(itemB.title));
        break;
    }

    return filteredContent;
  }

  const displayedContent = getDisplayedContent();

  return (
    <div className="mt-5 sm:mt-10">
      <h1>{capitalize(type)}</h1>
      <WatchInfo activeType={activeType} displayedContent={displayedContent} />

      <div className="sm:flex justify-between my-5">
        <TypeTabs
          activeType={activeType}
          setActiveType={setActiveType}
          setSortedBy={setSortedBy}
          sortedBy={sortedBy}
        />

        <div className="mt-3 sm:mt-0 flex flex-1 justify-between">
          <SortButton activeType={activeType} setSortedBy={setSortedBy} sortedBy={sortedBy} />

          <ExpandButton isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
        </div>
      </div>

      <div>
        {isExpanded ? (
          <WatchGrid
            displayedContent={displayedContent}
            deleteContentItemById={deleteContentItemById}
          />
        ) : (
          <ContentCarousel
            carouselType="watchlist"
            content={displayedContent}
            margin="mt-0"
            deleteContentItemById={deleteContentItemById}
          />
        )}
      </div>
    </div>
  );
}
