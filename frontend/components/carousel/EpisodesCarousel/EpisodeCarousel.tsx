"use client";

import { useState } from "react";
import SelectButton from "./_components/SelectButton";
import { Season } from "@/types";
import ContentCarousel from "../ContentCarousel";
import { isAlreadyReleased, toUpcomingReleaseDateDisplay } from "@/lib/utils";
import { CalendarDaysIcon } from "lucide-react";

export default function EpisodesCarousel({
  seasons,
  margin,
}: {
  seasons: Season[];
  margin?: string;
}) {
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [currentSeason, setCurrentSeason] = useState(getSeasonByNumber(1));

  const isSeasonReleased = isAlreadyReleased(currentSeason.releaseDate);
  const displayedEpisodes = isSeasonReleased ? currentSeason.episodes : [];

  function handleSeasonChange(value: string | null) {
    if (value) {
      const seasonNumber = Number(value.slice(7));
      setSelectedSeason(seasonNumber);
      setCurrentSeason(getSeasonByNumber(seasonNumber));
    }
  }

  function getSeasonByNumber(seasonNumber: number) {
    const season = seasons.find((season) => season.seasonNumber === seasonNumber);

    if (!season) {
      throw new Error(`Season number ${seasonNumber} not found.`);
    }

    return season;
  }

  return (
    <div className="relative">
      <ContentCarousel
        carouselType="episodes"
        content={displayedEpisodes}
        margin={margin}
        carouselTitle="Episodes"
      />

      {!isSeasonReleased && (
        <div className="flex items-center gap-2 my-2">
          <CalendarDaysIcon className="h-5 w-5 text-muted-foreground" />
          <p className="text-sm font-medium text-muted-foreground ">
            Expected Release:{" "}
            <span className="font-semibold text-foreground">
              {toUpcomingReleaseDateDisplay(currentSeason.releaseDate)}
            </span>
          </p>
        </div>
      )}

      <div className="absolute top-0 left-30 flex max-w-20 font-semibold">
        <SelectButton
          handleSeasonChange={handleSeasonChange}
          seasonsAmount={seasons.length}
          selectedSeason={selectedSeason}
        />
      </div>
    </div>
  );
}
