import { ContentItem } from "@/lib/constants";
import { FilmIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function RankedContentCard({
  contentItem,
  rank,
}: {
  contentItem: ContentItem;
  rank: number;
}) {
  return (
    <div className="flex justify-center sm:justify-start items-center">
      <h1 className="text-6xl mr-5">{rank}</h1>
      <Link href={`/${contentItem.type}/${contentItem.id}`}>
        <Image
          src={`/images${contentItem.poster_path}`}
          alt="poster"
          width={150}
          height={100}
          className="rounded-xl"
        />
      </Link>
      <div className="space-y-3 ml-2">
        <p className="truncate max-w-30 sm:max-w-45 md:max-w-35 lg:max-w-50 xl:max-w-40 2xl:max-w-50 font-semibold text-lg">
          {contentItem.title}
        </p>
        <div className="flex space-x-1 items-center muted-text">
          <FilmIcon size={20} />
          <p>{contentItem.genres.join(" • ")}</p>
        </div>
        <div className="flex items-center">
          <StarIcon size={20} color="#eab308" fill="#eab308" />
          <p className="mx-1 font-semibold">{contentItem.vote_average}</p>
          <p className="muted-text"> | {contentItem.type}</p>
        </div>
      </div>
    </div>
  );
}
