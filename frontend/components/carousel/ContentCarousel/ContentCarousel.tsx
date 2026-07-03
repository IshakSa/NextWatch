import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import PosterContentCard from "./_components/PosterContentCard";
import BackdropContentCard from "./_components/BackdropContentCard";
import RankedContentCard from "./_components/RankedContentCard";
import CreditsCard from "./_components/CreditsCard";
import EpisodeCard from "./_components/EpisodeCard";
import { Actor, ContentItem, Director, Episode } from "@/types";
import WatchlistCard from "./_components/WatchlistCard";
import { WatchTabType } from "@/components/watchlist/WatchTab";

type AllowedCarouselTypes = "poster" | "backdrop" | "ranked" | "credits" | "episodes" | "watchlist";

type ContentCarouselProps<T extends AllowedCarouselTypes> = {
  rowName?: string;
  carouselType: T;
  content: T extends "credits"
    ? Actor[] | Director[]
    : T extends "episodes"
      ? Episode[]
      : ContentItem[];
  margin?: string;
  watchlistCardProps?: T extends "watchlist"
    ? {
        type: WatchTabType;
        deleteContentItemById: (contentItemId: number) => void;
      }
    : undefined;
};

const CONTENT_STYLES = {
  poster: "px-30 -ml-35",
  backdrop: "px-30 -ml-35",
  ranked: "sm:px-50 sm:-ml-55 md:px-5 md:-ml-10 lg:px-30 lg:-ml-35",
  credits: "sm:px-30 sm:-ml-35 md:px-0 md:-ml-4",
  episodes: "px-20 -ml-25 sm:px-30 sm:-ml-35",
  watchlist: "px-30 -ml-35",
};

const ITEM_STYLES = {
  poster: "basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4",
  backdrop: "basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4",
  ranked: "basis-full md:basis-1/2 xl:basis-1/3",
  credits: "basis-full basis-1/2 sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5 2xl:basis-1/6",
  episodes: "basis-full md:basis-1/2 xl:basis-1/3",
  watchlist: "basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 2xl:basis-1/5",
};

export default function ContentCarousel<T extends AllowedCarouselTypes>({
  rowName,
  carouselType,
  content,
  margin = "mt-25",
  watchlistCardProps,
}: ContentCarouselProps<T>) {
  const contentClassName = CONTENT_STYLES[carouselType];
  const itemClassName = ITEM_STYLES[carouselType];

  return (
    <div className={`${margin}`}>
      {rowName && <h2 className="mb-5">{rowName}</h2>}

      <Carousel
        opts={{
          slidesToScroll: "auto",
        }}
        className="group relative"
      >
        <CarouselContent className={contentClassName}>
          {content.map((item, index) => {
            return (
              <CarouselItem key={index} className={`pl-5 ${itemClassName}`}>
                {carouselType === "poster" ? (
                  <PosterContentCard contentItem={item as ContentItem} />
                ) : carouselType === "backdrop" ? (
                  <BackdropContentCard contentItem={item as ContentItem} />
                ) : carouselType === "ranked" ? (
                  <RankedContentCard contentItem={item as ContentItem} rank={index + 1} />
                ) : carouselType === "watchlist" && watchlistCardProps ? (
                  <WatchlistCard
                    contentItem={item as ContentItem}
                    deleteContentItemById={watchlistCardProps.deleteContentItemById}
                    type={watchlistCardProps.type}
                  />
                ) : carouselType === "credits" ? (
                  <CreditsCard person={item as Actor | Director} />
                ) : (
                  <EpisodeCard episode={item as Episode} />
                )}
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <div className="absolute inset-0 z-20 invisible opacity-0 transition-all duration-300 group-hover:visible group-hover:opacity-100 pointer-events-none">
          <CarouselPrevious className="z-10 left-3 pointer-events-auto dark:bg-background/40 dark:hover:bg-background/25" />
          <CarouselNext className="z-10 right-3 pointer-events-auto" />
        </div>
        <div className="absolute pointer-events-none top-0 bottom-0 right-0 w-1/8 bg-linear-to-l from-background to-transparent" />
      </Carousel>
    </div>
  );
}
