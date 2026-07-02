import WatchedButton from "@/components/actions/WatchedButton";
import ImageLoader from "@/components/shared/ImageLoader";
import { ImageSizes } from "@/lib/constants";
import { ContentItem } from "@/types";
import Link from "next/link";
import InfoOverlay from "./InfoOverlay";
import { toDisplayContentLength, toDisplayContentType } from "@/lib/utils";
import DeleteButton from "@/components/actions/DeleteButton";

export default function WatchlistCard({
  contentItem,
  deleteContentItemById,
}: {
  contentItem: ContentItem;
  deleteContentItemById: (contentItemId: number) => void;
}) {
  function handleDeleteContentItem() {
    console.log("Deleted: ", contentItem.id);
    deleteContentItemById(contentItem.id);
  }

  return (
    <>
      <div className="relative text-white">
        <Link href={`/${contentItem.type}/${contentItem.id}`}>
          <ImageLoader
            src={contentItem.posterPath}
            alt="poster"
            apiWidth={ImageSizes.poster}
            className="rounded-xl"
            width={ImageSizes.poster}
            height={500}
          />
        </Link>
        <div className="flex justify-between absolute bottom-0 left-0 z-10 p-4 md:p-3 w-full bg-linear-to-t from-black to-transparent rounded-b-xl">
          <WatchedButton hideText={true} />
          <DeleteButton handleDeleteContentItem={handleDeleteContentItem} />
        </div>
      </div>
      <div>
        <InfoOverlay
          contentTitle={contentItem.title}
          rating={contentItem.rating}
          extras={[
            toDisplayContentType(contentItem.type),
            toDisplayContentLength(contentItem.type, contentItem.length, true),
          ]}
        />
      </div>
    </>
  );
}
