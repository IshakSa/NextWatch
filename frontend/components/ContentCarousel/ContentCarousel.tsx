import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { movieData } from "@/lib/constants";
import PosterContentCard from "./_components/PosterContentCard";
import BackdropContentCard from "./_components/BackdropContentCard";
import RankedContentCard from "./_components/RankedContentCard";

const movies = movieData;

export default function ContentCarousel({
  rowName,
  carouselType,
}: {
  rowName: string;
  carouselType: "poster" | "backdrop" | "ranked";
}) {
  return (
    <div className="mt-25">
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
              : "px-30 -ml-35"
          }
        >
          {movies.map((movie, index) => {
            const imageType =
              carouselType === "poster" || carouselType === "ranked"
                ? movie.poster_path
                : movie.backdrop_path;
            return (
              <CarouselItem
                key={index}
                className={`pl-5 basis-full 
                  ${carouselType === "ranked" ? "md:basis-1/2 xl:basis-1/3" : "sm:basis-1/3 md:basis-1/4"}`}
              >
                {carouselType === "poster" ? (
                  <PosterContentCard
                    id={movie.id}
                    contentType={movie.contentType}
                    contentTitle={movie.title}
                    genres={["Action", "Drama"]}
                    image={`/images${imageType}`}
                    rating={movie.vote_average}
                  />
                ) : carouselType === "backdrop" ? (
                  <BackdropContentCard
                    id={movie.id}
                    contentType={movie.contentType}
                    contentTitle={movie.title}
                    genres={["Action", "Drama"]}
                    image={`/images${imageType}`}
                    rating={movie.vote_average}
                  />
                ) : (
                  // TODO: get content type, limit ranking to only max 10
                  <RankedContentCard
                    id={movie.id}
                    contentType={movie.contentType}
                    contentTitle={movie.title}
                    genres={["Action", "Drama"]}
                    image={`/images${imageType}`}
                    rank={index + 1}
                    rating={movie.vote_average}
                  />
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
