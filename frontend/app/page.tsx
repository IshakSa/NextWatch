import ContentCarousel from "@/components/ContentCarousel/ContentCarousel";
import { movieData } from "@/lib/constants";
import { BookmarkIcon, CirclePlayIcon } from "lucide-react";
import Image from "next/image";

const data = movieData[0];

export default async function Home() {
  return (
    <main>
      <div className="relative max-w-full h-[66.66vh] flex justify-center items-center ">
        <Image
          src={`/images${data.backdrop_path}`}
          alt="poster"
          fill
          unoptimized
          priority
          className="object-cover object-center"
        />

        <div className="absolute top-0 left-0 right-0 h-1/4 bg-linear-to-b from-background to-transparent opacity-50" />
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-linear-to-t from-background to-transparent" />
        <div className="hidden lg:block absolute top-0 bottom-0 left-0 w-1/24 bg-linear-to-r from-background to-transparent" />
        <div className="hidden lg:block absolute top-0 bottom-0 right-0 w-1/24 bg-linear-to-l from-background to-transparent" />

        <div className="absolute left-0 bottom-0 flex flex-col z-1">
          <div>{data.contentType}</div>

          <h1>{data.title}</h1>

          <p>
            {data.length} • {data.release_date.slice(0, 4)} •{" "}
            {data.genres?.join(" • ")}
          </p>

          <p>{data.overview}</p>

          <div className="flex">
            <button className="flex">
              <CirclePlayIcon />
              <p>Watch Trailer</p>
            </button>

            <button className="flex">
              <BookmarkIcon />
              <p>Add Watchlist</p>
            </button>
          </div>
        </div>
      </div>


      <ContentCarousel rowName="Just Release" />

      <ContentCarousel rowName="Movies" />

      <ContentCarousel rowName="Series" />


    </main>
  );
}
