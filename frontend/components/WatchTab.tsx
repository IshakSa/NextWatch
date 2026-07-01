"use client";

import { ContentItem } from "@/types";
import ContentCarousel from "./carousel/ContentCarousel/ContentCarousel";
import { capitalize, toMovieLength } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "./ui/select";
import { Button } from "./ui/button";
import { useState } from "react";
import WatchlistCard from "./carousel/ContentCarousel/_components/WatchlistCard";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";

const SORT_VALUE_MAP = {
  newest: "Recently Added",
  oldest: "Oldest Added",
  "title-asc": "Title (A-Z)",
  "title-desc": "Title (Z-A)",
  "release-newest": "Release Year",
  "runtime-asc": "Runtime (Shortest)",
  "runtime-desc": "Runtime (Longest)",
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
  const [sortedBy, setSortedBy] = useState<SortKey>("newest");

  function handleExpand() {
    setIsExpanded(!isExpanded);
  }

  function handleTypeChange(value: "all" | "movie" | "tv") {
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

  function getDisplayedContent() {
    let filteredContent;
    if (activeType === "all") {
      filteredContent = [...content];
    } else {
      filteredContent = content.filter((item) => item.type === activeType);
    }

    switch (sortedBy) {
      case "newest": // TODO
        break;
      case "oldest": // TODO
        break;
      case "title-asc":
        filteredContent = filteredContent.sort((itemA, itemB) =>
          itemA.title.localeCompare(itemB.title),
        );
        break;
      case "title-desc":
        filteredContent = filteredContent.sort((itemA, itemB) =>
          itemB.title.localeCompare(itemA.title),
        );
        break;
      case "release-newest":
        filteredContent = filteredContent.sort(
          (itemA, itemB) =>
            new Date(itemA.releaseDate).getTime() -
            new Date(itemB.releaseDate).getTime(),
        );
        break;
      case "runtime-asc":
        filteredContent = filteredContent.sort(
          (itemA, itemB) => itemA.length - itemB.length,
        );
        break;
      case "runtime-desc":
        filteredContent = filteredContent.sort(
          (itemA, itemB) => itemB.length - itemA.length,
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
          <Select defaultValue={"newest"} onValueChange={handleSortChange}>
            <SelectTrigger className="w-41 rounded-lg">
              <span>{SORT_VALUE_MAP[sortedBy]}</span>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="newest">Recently Added</SelectItem>
                <SelectItem value="oldest">Oldest Added</SelectItem>

                <SelectItem value="title-asc">Title (A-Z)</SelectItem>
                <SelectItem value="title-desc">Title (Z-A)</SelectItem>

                <SelectItem value="release-newest">Release Year</SelectItem>

                <SelectItem value="runtime-asc">Runtime (Shortest)</SelectItem>
                <SelectItem value="runtime-desc">Runtime (Longest)</SelectItem>
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
                <WatchlistCard contentItem={contentItem} />
              </div>
            ))}
          </div>
        ) : (
          <ContentCarousel
            carouselType="watchlist"
            content={displayedContent}
            margin="mt-0"
          />
        )}
      </div>
    </div>
  );
}
