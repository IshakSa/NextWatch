import InfoOverlay from "./InfoOverlay";
import Link from "next/link";
import { ContentItem, ImageSizes } from "@/lib/constants";
import ImageLoader from "@/components/shared/ImageLoader";

export default function PosterContentCard({
  contentItem,
}: {
  contentItem: ContentItem;
}) {
  return (
    <div className="relative text-white">
      <Link href={`/${contentItem.type}/${contentItem.id}`}>
        <ImageLoader
          src={contentItem.poster_path}
          alt="poster"
          apiWidth={ImageSizes.poster}
          className="rounded-xl"
          width={ImageSizes.poster}
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
