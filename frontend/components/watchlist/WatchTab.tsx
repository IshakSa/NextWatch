"use client";

import { ContentItem } from "@/types";
import ContentCarousel from "../carousel/ContentCarousel/ContentCarousel";
import { capitalize, toMovieLength } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "../ui/select";
import { Button } from "../ui/button";
import { useState } from "react";
import WatchlistCard from "../carousel/ContentCarousel/_components/WatchlistCard";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  Trash2Icon,
  Undo2Icon,
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { toast } from "sonner";

const SORT_VALUE_MAP = {
  "added-desc": "Recently added",
  "added-asc": "Oldest added",
  "rating-desc": "Top rated",
  "release-desc": "Newest release",
  "runtime-desc": "Longest",
  "runtime-asc": "Shortest",
  "title-asc": "Title (A–Z)",
} as const;

type SortKey = keyof typeof SORT_VALUE_MAP;

export default function WatchTab({
  type,
  content,
}: {
  type: "watchlist" | "watched";
  content: ContentItem[];
}) {
  const [activeType, setActiveType] = useState<"all" | "movie" | "tv">("all");
  const [isExpanded, setIsExpanded] = useState(false);
  const [sortedBy, setSortedBy] = useState<SortKey>("added-desc");
  const [localContent, setLocalContent] = useState(content);

  function handleExpand() {
    setIsExpanded(!isExpanded);
  }

  function handleTypeChange(value: "all" | "movie" | "tv") {
    if (
      value === "all" &&
      (sortedBy === "runtime-asc" || sortedBy === "runtime-desc")
    ) {
      setSortedBy("added-desc");
    }
    setActiveType(value);
  }

  function handleSortChange(value: string | null) {
    if (value) {
      setSortedBy(value as SortKey);
    }
  }

  function getTotalRuntime() {
    let totalMovieLength = 0;
    let totalEpisodes = 0;
    for (const item of displayedContent) {
      if (item.type === "tv") {
        totalEpisodes += item.length;
      } else {
        totalMovieLength += item.length;
      }
    }
    return { totalMovieLength, totalEpisodes };
  }

  function getRuntimeDisplay() {
    const movieString = toMovieLength(totalMovieLength);
    const tvString = `${totalEpisodes} Episodes`;

    if (activeType === "movie") return movieString;
    if (activeType === "tv") return tvString;
    return `${movieString} | ${tvString}`;
  }

  function getTotalSavedDisplay() {
    const total = displayedContent.length;

    if (activeType === "all") return total + " Titles";
    if (activeType === "movie") return total + " Movies";
    return total + " Shows";
  }

  function deleteContentItemById(contentItemId: number) {
    const deletedContentItem = localContent.find(
      (contentItem) => contentItem.id === contentItemId,
    );

    if (!deletedContentItem) {
      return;
    }

    setLocalContent(
      localContent.filter((contentItem) => contentItem !== deletedContentItem),
    );

    // TODO: connect remove to backend

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
            new Date(itemB.releaseDate).getTime() -
            new Date(itemA.releaseDate).getTime(),
        );
        break;

      case "runtime-desc":
        filteredContent.sort((itemA, itemB) => itemB.length - itemA.length);
        break;

      case "runtime-asc":
        filteredContent.sort((itemA, itemB) => itemA.length - itemB.length);
        break;

      case "title-asc":
        filteredContent.sort((itemA, itemB) =>
          itemA.title.localeCompare(itemB.title),
        );
        break;
    }

    return filteredContent;
  }

  const displayedContent = getDisplayedContent();
  const { totalMovieLength, totalEpisodes } = getTotalRuntime();

  return (
    <div className="mt-5 sm:mt-10">
      <h1>{capitalize(type)}</h1>
      <p className="muted-text">Total saved: {getTotalSavedDisplay()}</p>
      <p className="muted-text">Total runtime: {getRuntimeDisplay()}</p>
      <div className="sm:flex justify-between my-5">
        <Tabs
          defaultValue="all"
          onValueChange={handleTypeChange}
          className="mr-3"
        >
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="movie">Movies</TabsTrigger>
            <TabsTrigger value="tv">Series</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="mt-3 sm:mt-0 flex flex-1 justify-between">
          <Select value={sortedBy} onValueChange={handleSortChange}>
            <SelectTrigger className="w-40 rounded-lg">
              <span>{SORT_VALUE_MAP[sortedBy]}</span>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="added-desc">Recently added</SelectItem>
                <SelectItem value="added-asc">Oldest added</SelectItem>
                <SelectItem value="rating-desc">Top rated</SelectItem>
                <SelectItem value="release-desc">Newest release</SelectItem>
                {activeType !== "all" && (
                  <>
                    <SelectItem value="runtime-asc">Shortest</SelectItem>
                    <SelectItem value="runtime-desc">Longest</SelectItem>
                  </>
                )}
                <SelectItem value="title-asc">Title (A–Z)</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Button variant="ghost" onClick={handleExpand}>
            {isExpanded ? (
              <>
                Collapse
                <ChevronUpIcon />
              </>
            ) : (
              <>
                Expand
                <ChevronDownIcon />
              </>
            )}
          </Button>
        </div>
      </div>

      <div>
        {isExpanded ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-6">
            {displayedContent.map((contentItem, index) => (
              <div key={index} className="cursor-pointer">
                <WatchlistCard
                  contentItem={contentItem}
                  deleteContentItemById={deleteContentItemById}
                />
              </div>
            ))}
          </div>
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
