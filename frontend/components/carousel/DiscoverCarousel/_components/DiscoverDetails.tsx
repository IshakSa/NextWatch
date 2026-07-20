import ExpandableOverview from "@/components/shared/ExpandableOverview";
import ImageLoader from "@/components/shared/ImageLoader";
import { Badge } from "@/components/ui/badge";
import { toDisplayContentLength, toDisplayContentType, toReleaseDateDisplay } from "@/lib/utils";
import { ContentItem } from "@/types";
import { StarIcon } from "lucide-react";

export default function DiscoverDetails({
  item,
  isHighScreen,
  onDoubleClick,
}: {
  item: ContentItem;
  isHighScreen: boolean;
  onDoubleClick: () => void;
}) {
  return (
    <div className="w-8/10 select-none" onDoubleClick={onDoubleClick}>
      <div>
        {isHighScreen && (
          <ImageLoader
            src={item.posterPath}
            alt={item.title}
            imageType="poster"
            width={88}
            height={132}
            className="mb-5 rounded-xl shadow-2xl ring-1 ring-white/10"
          />
        )}

        <div className="flex space-x-2 mb-4">
          <Badge variant="outline" className="p-3">
            {toDisplayContentType(item.type)}
          </Badge>
          <Badge className="p-3" variant="outline">
            <div className="flex items-center text-sm">
              <StarIcon size={15} color="var(--star)" fill="var(--star)" />
              <p className="mx-1">{item.rating}</p>
            </div>
          </Badge>
        </div>

        <h1 className="tracking-tight text-2xl">{item.title}</h1>

        <p className="text-foreground/50 dark:text-muted-foreground text-sm my-2">
          {toDisplayContentLength(item.type, item.length)} •{" "}
          {toReleaseDateDisplay(item.releaseDate)} • {item.genres?.join(" • ")}
        </p>

        <div className="max-w-xl">
          <ExpandableOverview page="discover" text={item.overview} />
        </div>
      </div>
    </div>
  );
}
