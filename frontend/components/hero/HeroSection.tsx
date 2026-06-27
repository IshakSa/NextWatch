"use client";

import ExpandableOverview from "@/components/shared/ExpandableOverview";
import AddWatchlistButton from "@/components/actions/AddWatchlistButton";
import TrailerButton from "@/components/actions/TrailerButton";
import { Badge } from "@/components/ui/badge";
import { ContentItem } from "@/lib/constants";
import HeroImage from "./_components/HeroImage";
import WatchedButton from "../actions/WatchedButton";
import ShareButton from "../actions/ShareButton";
import { useState } from "react";
import EmbeddedVideo from "../shared/EmbeddedVideo";
import { toMovieLength } from "@/lib/utils";

export default function HeroSection({
  contentItem,
  page,
  size = 70,
}: {
  contentItem: ContentItem;
  page: "home" | "details";
  size?: number;
}) {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  return (
    <div
      className="relative max-w-full flex justify-center items-center"
      style={{ height: `${size}vh` }}
    >
      <HeroImage image={contentItem.backdropPath} />

      {/* TODO: add video from contentItem data */}
      {isVideoPlaying && (
        <EmbeddedVideo
          youtubeId="O-b2VfmmbyA"
          setIsVideoPlaying={setIsVideoPlaying}
        />
      )}

      <div className="container absolute left-1/2 bottom-0 -translate-x-1/2 flex flex-col z-1 px-4 sm:px-6 lg:px-8 mb-10">
        <div className="flex space-x-2 mb-5">
          <Badge variant="secondary" className="px-3 py-2.5">
            {contentItem.type === "tv" ? "Series" : "Movie"}
          </Badge>
          <Badge className="px-3 py-2.5">Seen</Badge>
          {/* TODO: ADD functionality to check if user has seen it */}
        </div>

        <h1>{contentItem.title}</h1>

        <p className="text-foreground/50 dark:text-muted-foreground text-sm my-2">
          {contentItem.type === "movie" ? toMovieLength(contentItem.length) : `${contentItem.length} Episodes`} • {contentItem.releaseDate.slice(0, 4)} •{" "}
          {contentItem.genres?.join(" • ")}
        </p>

        {page === "home" ? (
          <>
            <ExpandableOverview text={contentItem.overview} page="home" />

            <div className="flex gap-5 justify-center sm:justify-start mt-5">
              <TrailerButton
                className="p-5 rounded-lg flex-1 w-auto sm:flex-initial"
                setIsVideoPlaying={setIsVideoPlaying}
              />
              <AddWatchlistButton
                className="p-5 rounded-lg flex-1 w-auto sm:flex-initial"
                page="home"
              />
            </div>
          </>
        ) : (
          <div className="flex justify-between mt-5 gap-3">
            <div className="flex gap-5 justify-center w-full sm:justify-start">
              <TrailerButton
                className="p-5 rounded-lg flex-1 sm:flex-initial"
                setIsVideoPlaying={setIsVideoPlaying}
              />
              <AddWatchlistButton
                className="hidden sm:inline-flex p-5 rounded-lg w-auto sm:flex-initial"
                page="details"
              />
            </div>
            <div className="flex gap-3">
              <AddWatchlistButton
                className="sm:hidden rounded-lg p-5 sm:w-auto"
                page="details"
              />
              <WatchedButton className="rounded-lg p-5 sm:w-auto" />
              <ShareButton className="rounded-lg p-5 sm:w-auto" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
