import ContentCarousel from "@/components/ContentCarousel/ContentCarousel";
import ExpandableOverview from "@/components/ExpandableOverview";
import AddWatchlistButton from "@/components/buttons/AddWatchlistButton";
import TrailerButton from "@/components/buttons/TrailerButton";
import { Badge } from "@/components/ui/badge";
import { movieData } from "@/lib/constants";
import Image from "next/image";

const data = movieData[0];

export default async function Home() {
  return (
    <main>
      <section className="relative max-w-full h-[70vh] flex justify-center items-center ">
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

        <div className="container absolute left-1/2 bottom-0 -translate-x-1/2 flex flex-col z-1 px-4 sm:px-6 lg:px-8 mb-10">
          <div className="flex space-x-2 mb-5">
            <Badge variant={"outline"} className="bg-background/80">
              {data.contentType}
            </Badge>
            <Badge>Seen</Badge>{" "}
            {/* TODO: ADD functionality to check if user has seen it */}
          </div>

          <h1>{data.title}</h1>

          <p className="muted-text my-2">
            {data.length} • {data.release_date.slice(0, 4)} •{" "}
            {data.genres?.join(" • ")}
          </p>

          <ExpandableOverview text={data.overview} />

          <div className="flex mt-5">
            <TrailerButton className="p-5 rounded-lg" />

            <AddWatchlistButton className="mx-5 p-5 rounded-lg" />
          </div>
        </div>
      </section>

      <section className="container">
        <ContentCarousel carouselType="Poster" rowName="Just Release" />

        <ContentCarousel carouselType="Ranked" rowName="Popular" />

        <ContentCarousel carouselType="Backdrop" rowName="Movies" />
        <ContentCarousel carouselType="Backdrop" rowName="Series" />
      </section>
    </main>
  );
}
