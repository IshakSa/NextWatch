import InfoOverlay from "./InfoOverlay";
import Link from "next/link";
import { ImageSizes } from "@/lib/constants";
import ImageLoader from "@/components/shared/ImageLoader";
import { ContentItem } from "@/types";

export default function BackdropContentCard({ contentItem }: { contentItem: ContentItem }) {
  return (
    <div className="relative">
      <Link href={`/${contentItem.type}/${contentItem.id}`}>
        <ImageLoader
          src={contentItem.backdropPath}
          alt="backdrop"
          apiWidth={ImageSizes.backdrop}
          width={ImageSizes.backdrop}
          height={150}
          className="rounded-xl"
        />
        <div className="mt-2">
          <InfoOverlay
            contentTitle={contentItem.title}
            genres={contentItem.genres}
            rating={contentItem.rating}
          />
        </div>
      </Link>
    </div>
  );
}
