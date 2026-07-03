import { toWatchedDateDisplay } from "@/lib/utils";
import { WatchedItem } from "@/types/user";
import { StarIcon, UserIcon } from "lucide-react";

export default function UserWatchInfo({watchedItem}: {watchedItem: WatchedItem}) {
  return (
    <>
      <div className="flex items-center gap-1.5 text-sm font-medium h-6">
        <UserIcon className="ml-0.5 size-4 text-muted-foreground shrink-0" />

        {watchedItem.userRating === 0 ? (
          <span className="text-muted-foreground">Not rated yet</span>
        ) : (
          <div className="flex items-center gap-1">
            <span>My rating:</span>
            <div className="flex items-center gap-0.5 font-semibold">
              <StarIcon className="size-4 text-emerald-500 fill-emerald-500 shrink-0" />
              <span>{watchedItem.userRating}</span>
              <span className="text-xs text-muted-foreground font-normal">/10</span>
            </div>
          </div>
        )}
      </div>

      <div className="text-xs text-muted-foreground/80 mt-0.5">
        Watched {toWatchedDateDisplay(watchedItem.watchedTimestamp)} ago
      </div>
    </>
  );
}
