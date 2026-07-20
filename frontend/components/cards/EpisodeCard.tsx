import ExpandableOverview from "@/components/shared/ExpandableOverview";
import ImageLoader from "@/components/shared/ImageLoader";
import { IMAGE_SIZES } from "@/lib/constants";
import { Episode } from "@/types";

export default function EpisodeCard({ episode }: { episode: Episode }) {
  return (
    <div className="relative text-white">
      <ImageLoader
        src={episode.stillPath}
        alt="still"
        imageType="still"
        className="rounded-xl"
        width={IMAGE_SIZES.still}
        height={150}
      />
      <div className="absolute bottom-0 left-0 z-10 p-4 md:p-3 w-full bg-linear-to-t from-black to-transparent rounded-b-xl">
        <p className="text-white/80 text-sm">
          E. {episode.episodeNumber} | {episode.runtime}m
        </p>
        <p className="truncate font-semibold text-lg">{episode.name}</p>
        <div className="flex text-white/60 sm:text-sm text-xs">
          <ExpandableOverview text={episode.overview} page="episodes" />
        </div>
      </div>
    </div>
  );
}
