"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import EpisodeCard from "./_components/EpisodeCard";
import { Season } from "@/lib/constants";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function EpisodesCarousel({
  seasons,
  margin = "mt-25",
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
    return seasons.find((season) => season.season_number === seasonNumber);
  }

  return (
    <div className={`${margin}`}>
      <div className="flex gap-3">
        <h2 className="mb-5">Episodes</h2>
        <div className="flex max-w-20 font-semibold">
          <Select
            value={`Season ${selectedSeason}`}
            onValueChange={handleSeasonChange}
          >
            <SelectTrigger className="w-45">
              <SelectValue placeholder="Select Watch Option" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {Array.from({ length: seasons.length }, (_, index) => (
                  <SelectItem key={index} value={`Season ${index + 1}`}>
                    Season {index + 1}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Carousel
        opts={{
          slidesToScroll: "auto",
        }}
        className="group relative"
      >
        <CarouselContent className="px-20 -ml-25 sm:px-30 sm:-ml-35">
          {currentSeason &&
            currentSeason.episodes.map((episode, index) => {
              return (
                <CarouselItem
                  key={index}
                  className="pl-5 basis-full md:basis-1/2 xl:basis-1/3"
                >
                  <EpisodeCard episode={episode} />
                </CarouselItem>
              );
            })}
        </CarouselContent>
        <div className="absolute inset-0 z-20 invisible opacity-0 transition-all duration-300 group-hover:visible group-hover:opacity-100 pointer-events-none">
          <CarouselPrevious className="z-10 left-3 pointer-events-auto dark:bg-background/40 dark:hover:bg-background/25" />
          <CarouselNext className="z-10 right-3 pointer-events-auto" />
        </div>
        <div className="absolute top-0 bottom-0 right-0 w-1/8 bg-linear-to-l from-background to-transparent" />
      </Carousel>
    </div>
  );
}
