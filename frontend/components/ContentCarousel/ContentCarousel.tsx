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
  carouselType: "Poster" | "Backdrop" | "Ranked";
}) {
  return (
    <div className="mt-25">
      <h2 className="mb-5">{rowName}</h2>
      <Carousel
        opts={{
          slidesToScroll: "auto",
        }}
      >
        <CarouselContent
          className={
            carouselType === "Ranked"
              ? "sm:px-50 sm:-ml-55 md:px-5 md:-ml-10 lg:px-30 lg:-ml-35"
              : "px-30 -ml-35"
          }
        >
          {movies.map((movie, index) => {
            const imageType =
              carouselType === "Poster" || carouselType === "Ranked"
                ? movie.poster_path
                : movie.backdrop_path;
            return (
              <CarouselItem
                key={index}
                className={`pl-5 basis-full 
                  ${carouselType === "Ranked" ? "md:basis-1/2 xl:basis-1/3" : "sm:basis-1/3 md:basis-1/4"}`}
              >
                {carouselType === "Poster" ? (
                  <PosterContentCard
                    contentTitle={movie.title}
                    genres={["Action", "Drama"]}
                    image={`/images${imageType}`}
                    rating={movie.vote_average}
                  />
                ) : carouselType === "Backdrop" ? (
                  <BackdropContentCard
                    contentTitle={movie.title}
                    genres={["Action", "Drama"]}
                    image={`/images${imageType}`}
                    rating={movie.vote_average}
                  />
                ) : (
                  <RankedContentCard
                    contentTitle={movie.title}
                    genres={["Action", "Drama"]}
                    image={`/images${imageType}`}
                    rank={index + 1}
                    contentType={"Movie"} // TODO: get content type, limit ranking to only max 10
                    rating={movie.vote_average}
                  />
                )}
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious className="z-1 left-2" />
        <CarouselNext className="z-1 right-2" />
        <div className="absolute top-0 bottom-0 right-0 w-1/8 bg-linear-to-l from-background to-transparent" />
      </Carousel>
    </div>
  );
}
