import Image from "next/image";
import InfoOverlay from "./InfoOverlay";
import Link from "next/link";

interface ContentCardProps {
  id: number;
  contentType: "movie" | "tv";
  image: string;
  contentTitle: string;
  rating: number;
  genres: string[];
}

export default function BackdropContentCard({
  id,
  contentType,
  image,
  contentTitle,
  rating,
  genres,
}: ContentCardProps) {
  return (
    <div className="relative">
      <Link href={`/${contentType}/${id}`}>
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
      </Link>
    </div>
  );
}
