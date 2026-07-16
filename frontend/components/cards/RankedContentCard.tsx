import ImageLoader from "@/components/shared/ImageLoader";
import { ImageSizes } from "@/lib/constants";
import { isAlreadyReleased, toDisplayContentType, toUpcomingReleaseDateDisplay } from "@/lib/utils";
import { ContentItem } from "@/types";
import { ClapperboardIcon, FilmIcon, StarIcon, TvIcon } from "lucide-react";
import Link from "next/link";

export default function RankedContentCard({
  contentItem,
  rank,
}: {
  contentItem: ContentItem;
  rank: number;
}) {
  const isReleased = isAlreadyReleased(contentItem.releaseDate);
  const IconComponent = contentItem.type === "movie" ? ClapperboardIcon : TvIcon;

  return (
    <div className="flex justify-center sm:justify-start items-center">
      <h1 className="text-6xl mr-5">{rank}</h1>
      <Link href={`/${contentItem.type}/${contentItem.id}`}>
        <ImageLoader
          src={contentItem.posterPath}
          alt="poster"
          apiWidth={ImageSizes.poster}
          width={150}
          height={100}
          className="rounded-xl"
        />
      </Link>

      <div className="space-y-3 ml-2">
        <div>
          {!isReleased && (
            <p className="muted-text text-xs font-semibold">
              Release {toUpcomingReleaseDateDisplay(contentItem.releaseDate)}
            </p>
          )}
          <p className="truncate max-w-30 sm:max-w-45 md:max-w-35 lg:max-w-50 xl:max-w-40 2xl:max-w-50 font-semibold text-lg">
            {contentItem.title}
          </p>
        </div>

        <div className="flex space-x-1 items-center muted-text">
          <FilmIcon size={20} />
          <p>{contentItem.genres.join(" • ")}</p>
        </div>

        <div className="flex items-center">
          {isReleased && (
            <>
              <StarIcon size={20} color="var(--star)" fill="var(--star)" />
              <p className="ml-1 font-semibold">{contentItem.rating}</p>
            </>
          )}

          {isReleased && <p className="muted-text mx-1">|</p>}

          {!isReleased && <IconComponent size={20} className="muted-text mr-1" />}

          <p className="muted-text">{toDisplayContentType(contentItem.type)}</p>
        </div>
      </div>
    </div>
  );
}
