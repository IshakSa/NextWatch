"use client";

import ExpandableOverview from "@/components/shared/ExpandableOverview";
import AddWatchlistButton from "@/components/actions/WatchlistButtons/AddWatchlistButton";
import TrailerButton from "@/components/actions/TrailerButton";
import { Badge } from "@/components/ui/badge";
import HeroImage from "./_components/HeroImage";
import WatchedButton from "../actions/WatchlistButtons/WatchedButton";
import ShareButton from "../actions/ShareButton";
import { useState } from "react";
import EmbeddedVideo from "../shared/EmbeddedVideo";
import {
  isAlreadyReleased,
  toDisplayContentLength,
  toDisplayContentType,
  toReleaseDateDisplay,
  toUpcomingReleaseDateDisplay,
} from "@/lib/utils";
import { ContentItem, WatchlistStatus } from "@/types";

export default function HeroSection({
  contentItem,
  page,
  size = 70,
  watchlistStatus,
  isLoggedIn,
  clickable = false,
}: {
  contentItem: ContentItem;
  page: "home" | "details";
  size?: number;
  watchlistStatus: WatchlistStatus;
  isLoggedIn: boolean;
  clickable?: boolean;
}) {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const isReleased = isAlreadyReleased(contentItem.releaseDate);
  const savedInitialState = watchlistStatus === "saved";
  const watchedInitialState = watchlistStatus === "watched";

  return (
    <div
      className="relative max-w-full flex justify-center items-center"
      style={{ height: `${size}vh` }}
    >
      <HeroImage contentItem={contentItem} clickable={clickable} />

      {isVideoPlaying && (
        <EmbeddedVideo youtubeId={contentItem.trailerId} setIsVideoPlaying={setIsVideoPlaying} />
      )}

      <div className="container absolute left-1/2 bottom-0 -translate-x-1/2 flex flex-col z-1 px-4 sm:px-6 lg:px-8 mb-10">
        <div className="flex space-x-2 mb-3 md:mb-5">
          <Badge variant="secondary" className="px-3 py-2.5 backdrop-blur-xl">
            {toDisplayContentType(contentItem.type)}
          </Badge>
          {!isAlreadyReleased(contentItem.releaseDate) && (
            <Badge variant="secondary" className="px-3 py-2.5">
              Upcoming
            </Badge>
          )}

          {watchlistStatus === "watched" && <Badge className="px-3 py-2.5">Seen</Badge>}
        </div>

        {!isReleased && (
          <p className="muted-text font-semibold mb-1">
            Release {toUpcomingReleaseDateDisplay(contentItem.releaseDate)}
          </p>
        )}

        <h1>{contentItem.title}</h1>

        <p className="text-foreground/50 dark:text-muted-foreground text-sm my-2">
          {toDisplayContentLength(contentItem.type, contentItem.length)} •{" "}
          {toReleaseDateDisplay(contentItem.releaseDate)} • {contentItem.genres?.join(" • ")}
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
                contentId={contentItem.id}
                contentType={contentItem.type}
                savedInitialState={savedInitialState}
                isLoggedIn={isLoggedIn}
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
                contentId={contentItem.id}
                contentType={contentItem.type}
                savedInitialState={savedInitialState}
                isLoggedIn={isLoggedIn}
              />
            </div>
            <div className="flex gap-3">
              <AddWatchlistButton
                className="sm:hidden rounded-lg p-5 sm:w-auto"
                hideText
                contentId={contentItem.id}
                contentType={contentItem.type}
                savedInitialState={savedInitialState}
                isLoggedIn={isLoggedIn}
              />
              <WatchedButton
                className="rounded-lg p-5 sm:w-auto"
                watchedInitialState={watchedInitialState}
                contentId={contentItem.id}
                contentType={contentItem.type}
                isLoggedIn={isLoggedIn}
              />
              <ShareButton className="rounded-lg p-5 sm:w-auto" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
