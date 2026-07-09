import { toWatchedDateDisplay } from "@/lib/utils";
import { WatchedItem, WatchlistItem } from "@/types/user";
import { StarIcon, UserIcon } from "lucide-react";
import { WatchTabType } from "../WatchTab";

export default function UserWatchInfo({
  contentItem,
  type,
}: {
  contentItem: WatchedItem | WatchlistItem;
  type: WatchTabType;
}) {
  
  if (type === "watchlist") {
    return (
      <div className="text-xs text-muted-foreground/80 mt-1">
        Added {toWatchedDateDisplay((contentItem as WatchlistItem).addedTimestamp)} ago
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center gap-1.5 text-sm font-medium h-6">
        <UserIcon className="ml-0.5 size-4 text-muted-foreground shrink-0" />

        {(contentItem as WatchedItem).userRating === 0 ? (
          <span className="text-muted-foreground">Not rated yet</span>
        ) : (
          <div className="flex items-center gap-1">
            <span>My rating:</span>
            <div className="flex items-center gap-0.5 font-semibold">
              <StarIcon className="size-4 text-primary-highlight fill-primary-highlight shrink-0" />
              <span>{(contentItem as WatchedItem).userRating}</span>
              <span className="text-xs text-muted-foreground font-normal">/10</span>
            </div>
          </div>
        )}
      </div>
      <div className="text-xs text-muted-foreground/80 mt-0.5">
        Watched {toWatchedDateDisplay((contentItem as WatchedItem).watchedTimestamp)} ago
      </div>
    </>
  );
}
