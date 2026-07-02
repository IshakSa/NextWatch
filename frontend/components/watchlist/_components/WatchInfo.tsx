import { toMovieLength } from "@/lib/utils";
import { ActiveType } from "./TypeTabs";
import { ContentItem } from "@/types";

export default function WatchInfo({
  activeType,
  displayedContent,
}: {
  activeType: ActiveType;
  displayedContent: ContentItem[];
}) {
  function getTotalRuntime() {
    let totalMovieLength = 0;
    let totalEpisodes = 0;
    for (const item of displayedContent) {
      if (item.type === "tv") {
        totalEpisodes += item.length;
      } else {
        totalMovieLength += item.length;
      }
    }
    return { totalMovieLength, totalEpisodes };
  }

  function getRuntimeDisplay() {
    const movieString = toMovieLength(totalMovieLength);
    const tvString = `${totalEpisodes} Episodes`;

    if (activeType === "movie") return movieString;
    if (activeType === "tv") return tvString;
    return `${movieString} | ${tvString}`;
  }

  function getTotalSavedDisplay() {
    const total = displayedContent.length;

    if (activeType === "all") return total + " Titles";
    if (activeType === "movie") return total + " Movies";
    return total + " Shows";
  }

  const { totalMovieLength, totalEpisodes } = getTotalRuntime();

  return (
    <>
      <p className="muted-text">Total saved: {getTotalSavedDisplay()}</p>
      <p className="muted-text">Total runtime: {getRuntimeDisplay()}</p>
    </>
  );
}
