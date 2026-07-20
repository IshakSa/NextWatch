import Link from "next/link";
import ImageLoader from "@/components/shared/ImageLoader";
import { ContentItem } from "@/types";
import InfoOverlay from "./InfoOverlay";

export default function BackdropContentCard({ contentItem }: { contentItem: ContentItem }) {
  return (
    <div className="relative">
      <Link href={`/${contentItem.type}/${contentItem.id}`}>
        <ImageLoader
          src={contentItem.backdropPath}
          alt="backdrop"
          imageType="backdrop"
          width={323}
          height={150}
          className="rounded-xl"
        />
        <div className="mt-2">
          <InfoOverlay contentItem={contentItem} />
        </div>
      </Link>
    </div>
  );
}
