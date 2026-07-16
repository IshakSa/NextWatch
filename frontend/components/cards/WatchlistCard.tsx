import WatchedButton from "@/components/actions/WatchlistButtons/WatchedButton";
import ImageLoader from "@/components/shared/ImageLoader";
import { ImageSizes } from "@/lib/constants";
import Link from "next/link";
import InfoOverlay from "./InfoOverlay";
import { toDisplayContentLength, toDisplayContentType } from "@/lib/utils";
import DeleteButton from "@/components/actions/WatchlistButtons/DeleteButton";
import { WatchTabType } from "@/components/watchlist/WatchTab";
import EditRatingButton from "@/components/actions/WatchlistButtons/EditRatingButton";
import UserWatchInfo from "@/components/watchlist/_components/UserWatchInfo";
import { WatchedItem, WatchlistItem } from "@/types/user";

export default function WatchlistCard({
  contentItem,
  deleteContentItemById,
  type,
}: {
  contentItem: WatchlistItem | WatchedItem;
  deleteContentItemById: (contentItemId: number) => void;
  type: WatchTabType;
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
          {type === "watched" ? (
            <EditRatingButton
              initialUserRating={(contentItem as WatchedItem).userRating}
              contentId={contentItem.id}
              contentType={contentItem.type}
            />
          ) : (
            <WatchedButton
              hideText={true}
              contentId={contentItem.id}
              contentType={contentItem.type}
              watchedInitialState={false}
            />
          )}
          <DeleteButton
            handleDeleteContentItem={handleDeleteContentItem}
            contentId={contentItem.id}
          />
        </div>
      </div>
      <div>
        <InfoOverlay
          contentItem={contentItem}
          extras={[
            toDisplayContentType(contentItem.type),
            toDisplayContentLength(contentItem.type, contentItem.length, true),
          ]}
          displayGenres={false}
        />

        <UserWatchInfo contentItem={contentItem} type={type} />
      </div>
    </>
  );
}
