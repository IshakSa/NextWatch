import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { Actor, ContentItem, Director } from "@/lib/constants";
import PosterContentCard from "./_components/PosterContentCard";
import BackdropContentCard from "./_components/BackdropContentCard";
import RankedContentCard from "./_components/RankedContentCard";
import CreditsCard from "./_components/CreditsCard";

type ContentCarouselProps<
  T extends "poster" | "backdrop" | "ranked" | "credits",
> = {
  rowName: string;
  carouselType: T;
  content: T extends "credits" ? Actor[] | Director[] : ContentItem[];
};

export default function ContentCarousel<
  T extends "poster" | "backdrop" | "ranked" | "credits",
>({ rowName, carouselType, content }: ContentCarouselProps<T>) {
  return (
    <div className={`${carouselType === "credits" ? "mt-15" : "mt-25"}`}>
      <h2 className="mb-5">{rowName}</h2>
      <Carousel
        opts={{
          slidesToScroll: "auto",
        }}
        className="group relative"
      >
        <CarouselContent
          className={
            carouselType === "ranked"
              ? "sm:px-50 sm:-ml-55 md:px-5 md:-ml-10 lg:px-30 lg:-ml-35"
              : carouselType === "credits"
                ? "sm:px-30 sm:-ml-35 md:px-0 md:-ml-4"
                : "px-30 -ml-35"
          }
        >
          {content.map((item, index) => {
            return (
              <CarouselItem
                key={index}
                className={`pl-5 basis-full 
                  ${
                    carouselType === "ranked"
                      ? "md:basis-1/2 xl:basis-1/3"
                      : carouselType === "credits"
                        ? "basis-1/2 sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5 2xl:basis-1/6"
                        : "sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                  }`}
              >
                {carouselType === "poster" ? (
                  <PosterContentCard contentItem={item as ContentItem} />
                ) : carouselType === "backdrop" ? (
                  <BackdropContentCard contentItem={item as ContentItem} />
                ) : carouselType === "ranked" ? (
                  // TODO: limit ranking to only max 10
                  <RankedContentCard
                    contentItem={item as ContentItem}
                    rank={index + 1}
                  />
                ) : (
                  <CreditsCard person={item as Actor | Director} />
                )}
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
