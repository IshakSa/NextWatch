import ExpandableOverview from "@/components/shared/ExpandableOverview";
import ImageLoader from "@/components/shared/ImageLoader";
import { Badge } from "@/components/ui/badge";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { ImageSizes } from "@/lib/constants";
import { toDisplayContentLength, toDisplayContentType } from "@/lib/utils";
import { ContentItem } from "@/types";
import { StarIcon } from "lucide-react";

export default function DiscoverDetails({ item }: { item: ContentItem }) {
  const isHighScreen = useMediaQuery("(min-height: 768px)");
  return (
    <div
      className={`absolute ${isHighScreen ? "bottom-20" : "bottom-15"} w-8/10 z-100 flex justify-between select-none container`}
    >
      <div>
        {isHighScreen && (
          <ImageLoader
            src={item.posterPath}
            alt={item.title}
            apiWidth={ImageSizes.poster}
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
              <StarIcon size={15} color="#eab308" fill="#eab308" />
              <p className="mx-1">{item.rating}</p>
            </div>
          </Badge>
        </div>

        <h1 className="tracking-tight text-2xl">{item.title}</h1>

        <p className="text-foreground/50 dark:text-muted-foreground text-sm my-2">
          {toDisplayContentLength(item.type, item.length)} • {item.releaseDate.slice(0, 4)} •{" "}
          {item.genres?.join(" • ")}
        </p>

        <ExpandableOverview page="home" text={item.overview} />
      </div>
    </div>
  );
}
