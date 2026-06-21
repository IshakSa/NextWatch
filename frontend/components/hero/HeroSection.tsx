import ExpandableOverview from "@/components/hero/_components/ExpandableOverview";
import AddWatchlistButton from "@/components/buttons/AddWatchlistButton";
import TrailerButton from "@/components/buttons/TrailerButton";
import { Badge } from "@/components/ui/badge";
import { ContentItem } from "@/lib/constants";
import HeroImage from "./_components/HeroImage";
import { capitalize } from "@/lib/utils";

export default function HeroSection({
  contentItem,
  type,
  size = 70,
}: {
  contentItem: ContentItem;
  type: "home" | "details";
  size?: number;
}) {
  return (
    <div
      className={`relative max-w-full flex justify-center items-center`}
      style={{ height: `${size}vh` }}
    >
      <HeroImage image={contentItem.backdrop_path} />

      <div className="container absolute left-1/2 bottom-0 -translate-x-1/2 flex flex-col z-1 px-4 sm:px-6 lg:px-8 mb-10">
        <div className="flex space-x-2 mb-5">
          <Badge variant={"secondary"}>{capitalize(contentItem.type)}</Badge>
          <Badge>Seen</Badge>
          {/* TODO: ADD functionality to check if user has seen it */}
        </div>

        <h1>{contentItem.title}</h1>

        <p className="text-foreground/50 dark:text-muted-foreground text-sm my-2">
          {contentItem.length} • {contentItem.release_date.slice(0, 4)} •{" "}
          {contentItem.genres?.join(" • ")}
        </p>

        {type === "home" && <ExpandableOverview text={contentItem.overview} />}

        <div className="flex justify-center sm:justify-start mt-5">
          <TrailerButton className="p-5 rounded-lg w-48/100 sm:w-auto" />

          <AddWatchlistButton className="ml-5 p-5 rounded-lg w-48/100 sm:w-auto" />
        </div>
      </div>
    </div>
  );
}
