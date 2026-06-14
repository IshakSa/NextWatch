import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { movieData } from "@/lib/constants";
import ContentCard from "./_components/ContentCard";

const movies = movieData;

export default function ContentCarousel({ rowName }: { rowName: string }) {
  return (
    <div className="mt-10">
      <h1>{rowName}</h1>
      <Carousel
        opts={{
          slidesToScroll: "auto",
        }}
      >
        <CarouselContent className="px-12 -ml-15">
          {movies.map((movie, index) => (
            <CarouselItem
              key={index}
              className="pl-5 basis-full sm:basis-1/3 md:basis-1/5"
            >
              <ContentCard
                key={movie.id}
                contentTitle={movie.title}
                genres={["Action", "Drama"]}
                poster={"/images/ngl2FKBlU4fhbdsrtdom9LVLBXw.jpg"}
                rating={movie.vote_average}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2 opacity-70 bg-white dark:bg-zinc-900 shadow-md" />
        <CarouselNext
          className="right-2 opacity-70 bg-white dark:bg-zinc-900 shadow-md"
          suppressHydrationWarning
        />
      </Carousel>
    </div>
  );
}
