import Image from "next/image";
import InfoOverlay from "./InfoOverlay";
import Link from "next/link";
import { ContentItem } from "@/lib/constants";

export default function PosterContentCard({
  contentItem,
}: {
  contentItem: ContentItem;
}) {
  return (
    <div className="relative text-white">
      <Link href={`/${contentItem.type}/${contentItem.id}`}>
        <Image
          className="rounded-xl"
          src={`/images${contentItem.poster_path}`}
          alt="poster"
          width={500}
          height={500}
        />
        <div className="absolute bottom-0 left-0 z-10 p-4 md:p-3 w-full bg-linear-to-t from-black to-transparent rounded-b-xl">
          <InfoOverlay
            contentTitle={contentItem.title}
            genres={contentItem.genres}
            rating={contentItem.vote_average}
          />
        </div>
      </Link>
    </div>
  );
}
