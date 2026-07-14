import { StarIcon } from "lucide-react";
import { ContentItem } from "@/types";
import { isAlreadyReleased, toUpcomingReleaseDateDisplay } from "@/lib/utils";

export default function InfoOverlay({
  contentItem,
  genreAmount = 2,
  extras,
  displayGenres = true,
}: {
  contentItem: ContentItem;
  genreAmount?: number;
  extras?: string[];
  displayGenres?: boolean;
}) {
  const isReleased = isAlreadyReleased(contentItem.releaseDate);
  return (
    <>
      <p className="truncate font-semibold text-lg mb-1">{contentItem.title}</p>

      <div className="flex items-center text-sm">
        {isReleased && (
          <>
            <StarIcon size={20} color="var(--star)" fill="var(--star)" />
            <p className="ml-1 font-semibold">{contentItem.rating}</p>
            <p className="muted-text mx-1">|</p>
          </>
        )}

        {displayGenres && (
          <p className="muted-text">{contentItem.genres.slice(0, genreAmount).join(" • ")}</p>
        )}
        {extras && <p className="muted-text">{extras.join(" • ")}</p>}
      </div>
      {!isReleased && (
        <p className="muted-text text-xs font-semibold mt-1">
          Release {toUpcomingReleaseDateDisplay(contentItem.releaseDate)}
        </p>
      )}
    </>
  );
}
