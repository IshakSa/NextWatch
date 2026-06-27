"use client";

import { useState } from "react";
import SelectButton from "./_components/SelectButton";
import ContentCarousel from "../ContentCarousel/ContentCarousel";
import { Season } from "@/types";

export default function EpisodesCarousel({
  seasons,
  margin,
}: {
  seasons: Season[];
  margin?: string;
}) {
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [currentSeason, setCurrentSeason] = useState(getSeasonByNumber(1));

  function handleSeasonChange(value: string | null) {
    if (value) {
      const seasonNumber = Number(value.slice(7));
      setSelectedSeason(seasonNumber);
      setCurrentSeason(getSeasonByNumber(seasonNumber));
    }
  }

  function getSeasonByNumber(seasonNumber: number) {
    const season = seasons.find(
      (season) => season.seasonNumber === seasonNumber,
    );

    if (!season) {
      throw new Error(`Season number ${seasonNumber} not found.`);
    }

    return season;
  }

  return (
    <div className="relative">
      <ContentCarousel
        carouselType="episodes"
        content={currentSeason.episodes}
        margin={margin}
        rowName="Episodes"
      />
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
