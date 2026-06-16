import Image from "next/image";
import InfoOverlay from "./InfoOverlay";

interface ContentCardProps {
  image: string;
  contentTitle: string;
  rating: number;
  genres: string[];
}

export default function PosterContentCard({
  image,
  contentTitle,
  rating,
  genres,
}: ContentCardProps) {
  return (
    <div className="relative">
      <Image
        className="rounded-xl"
        src={image}
        alt="poster"
        width={500}
        height={500}
      />
      <div className="absolute bottom-0 left-0 z-10 p-4 w-full bg-linear-to-t from-black to-transparent rounded-b-xl">
        <InfoOverlay
          contentTitle={contentTitle}
          genres={genres}
          rating={rating}
        />
      </div>
    </div>
  );
}
