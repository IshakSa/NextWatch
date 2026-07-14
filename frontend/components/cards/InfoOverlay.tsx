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
  const hasGenres = displayGenres && contentItem.genres && contentItem.genres.length > 0;
  const hasExtras = extras && extras.length > 0;

  const displaySeparator = isReleased && (hasGenres || hasExtras);

  return (
    <>
      {!isReleased && (
        <p className="muted-text text-xs font-semibold mt-1">
          Release {toUpcomingReleaseDateDisplay(contentItem.releaseDate)}
        </p>
      )}
      <p className="truncate font-semibold text-lg mb-1">{contentItem.title}</p>

      <div className="flex items-center text-sm">
        {isReleased && (
          <>
            <StarIcon size={20} color="var(--star)" fill="var(--star)" />
            <p className="ml-1 font-semibold">{contentItem.rating}</p>
          </>
        )}

        {displaySeparator && <p className="muted-text mx-1">|</p>}

        {hasGenres && (
          <p className="muted-text">{contentItem.genres.slice(0, genreAmount).join(" • ")}</p>
        )}
        {hasExtras && <p className="muted-text">{extras.join(" • ")}</p>}
      </div>
    </>
  );
}
