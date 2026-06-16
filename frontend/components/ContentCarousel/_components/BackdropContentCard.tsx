import Image from "next/image";
import InfoOverlay from "./InfoOverlay";

interface ContentCardProps {
  image: string;
  contentTitle: string;
  rating: number;
  genres: string[];
}

export default function BackdropContentCard({
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
        alt="backdrop"
        width={500}
        height={150}
      />
      <div className="mt-2">
      <InfoOverlay
        contentTitle={contentTitle}
        genres={genres}
        rating={rating}
      />
      </div>
    </div>
  );
}
