import Image from "next/image";
import InfoOverlay from "./InfoOverlay";
import Link from "next/link";
import { ContentItem } from "@/lib/constants";

export default function BackdropContentCard({
  contentItem,
}: {
  contentItem: ContentItem;
}) {
  return (
    <div className="relative">
      <Link href={`/${contentItem.type}/${contentItem.id}`}>
        <Image
          className="rounded-xl"
          src={`/images${contentItem.backdrop_path}`}
          alt="backdrop"
          width={500}
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
