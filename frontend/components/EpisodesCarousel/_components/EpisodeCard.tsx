import ExpandableOverview from "@/components/hero/_components/ExpandableOverview";
import { Episode } from "@/lib/constants";
import Image from "next/image";

export default function EpisodeCard({ episode }: { episode: Episode }) {
  return (
    <div className="relative text-white">
      <Image
        className="rounded-xl"
        src={`/images${episode.still_path}`}
        alt="backdrop"
        width={500}
        height={150}
      />
      <div className="absolute bottom-0 left-0 z-10 p-4 md:p-3 w-full bg-linear-to-t from-black to-transparent rounded-b-xl">
        <p className="text-white/80 text-sm">
          E. {episode.episode_number} | {episode.runtime}m
        </p>
        <p className="truncate font-semibold text-lg">{episode.name}</p>
        <div className="flex text-white/60 sm:text-sm text-xs">
          <ExpandableOverview text={episode.overview} page="episodes" />
        </div>
      </div>
    </div>
  );
}
