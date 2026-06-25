import InfoOverlay from "./InfoOverlay";
import Link from "next/link";
import { ContentItem, ImageSizes } from "@/lib/constants";
import ImageLoader from "@/components/shared/ImageLoader";

export default function BackdropContentCard({
  contentItem,
}: {
  contentItem: ContentItem;
}) {
  return (
    <div className="relative">
      <Link href={`/${contentItem.type}/${contentItem.id}`}>
        <ImageLoader
          src={contentItem.backdrop_path}
          alt="backdrop"
          apiWidth={ImageSizes.backdrop}
          width={ImageSizes.backdrop}
          height={150}
        />
        <div className="mt-2">
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
