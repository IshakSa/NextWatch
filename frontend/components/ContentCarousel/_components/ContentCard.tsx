import { StarIcon } from "lucide-react";
import Image from "next/image";

interface ContentCardProps {
  poster: string;
  contentTitle: string;
  rating: number;
  genres: string[];
}

export default function ContentCard({
  poster,
  contentTitle,
  rating,
  genres,
}: ContentCardProps) {
  return (
    <div>
      <div></div>
      <Image
        className="rounded-lg"
        src={poster}
        alt="poster"
        width={500}
        height={300}
      />
      <div className="z-1">
        <p className="truncate">{contentTitle}</p>
        <div className="flex">
          <StarIcon />
          <p>{rating}</p>
          <p className="mx-1"> | {genres.join(" • ")}</p>
        </div>
      </div>
    </div>
  );
}
