import { FilmIcon, StarIcon } from "lucide-react";
import Image from "next/image";

export default function RankedContentCard({
  rank,
  image,
  contentTitle,
  genres,
  rating,
  contentType,
}: {
  rank: number;
  image: string;
  genres: string[];
  contentTitle: string;
  rating: number;
  contentType: "Movie" | "Series";
}) {
  return (
    <div className="flex justify-center sm:justify-start items-center">
      <h1 className="text-6xl mr-5">{rank}</h1>
      <Image
        src={image}
        alt="poster"
        width={150}
        height={100}
        className="rounded-xl"
      />
      <div className="space-y-3 ml-2">
        <p className="truncate max-w-30 sm:max-w-45 md:max-w-35 lg:max-w-50 xl:max-w-40 2xl:max-w-50 font-semibold text-lg">
          {contentTitle}
        </p>
        <div className="flex space-x-1 items-center muted-text">
          <FilmIcon size={20} />
          <p>{genres.join(" • ")}</p>
        </div>
        <div className="flex items-center">
          <StarIcon size={20} color="#eab308" fill="#eab308" />
          <p className="mx-1 font-semibold">{rating}</p>
          <p className="muted-text"> | {contentType}</p>
        </div>
      </div>
    </div>
  );
}
