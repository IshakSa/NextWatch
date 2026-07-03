import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { ActiveType } from "./TypeTabs";
import { WatchTabType } from "../WatchTab";

export type SortKey =
  | "added-desc"
  | "added-asc"
  | "watched-desc"
  | "watched-asc"
  | "personal-rating-desc"
  | "rating-desc"
  | "release-desc"
  | "runtime-desc"
  | "runtime-asc"
  | "title-asc";

export default function SortButton({
  sortedBy,
  setSortedBy,
  activeType,
  type,
}: {
  sortedBy: SortKey;
  setSortedBy: (newSortedBy: SortKey) => void;
  activeType: ActiveType;
  type: WatchTabType;
}) {
  function handleSortChange(value: string | null) {
    if (value) {
      setSortedBy(value as SortKey);
    }
  }

  const SORT_VALUE_MAP = {
    "added-desc": "Recently added",
    "added-asc": "Oldest added",
    "watched-desc": "Recently watched",
    "watched-asc": "Oldest watched",
    "personal-rating-desc": "My top rated",
    "rating-desc": "Top rated",
    "release-desc": "Newest release",
    "runtime-desc": "Longest",
    "runtime-asc": "Shortest",
    "title-asc": "Title (A–Z)",
  };

  return (
    <Select value={sortedBy} onValueChange={handleSortChange}>
      <SelectTrigger className="w-40 rounded-lg">
        <span>{SORT_VALUE_MAP[sortedBy]}</span>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {type === "watched" ? (
            <>
              <SelectItem value="watched-desc">{SORT_VALUE_MAP["watched-desc"]}</SelectItem>
              <SelectItem value="watched-asc">{SORT_VALUE_MAP["watched-asc"]}</SelectItem>
              <SelectItem value="personal-rating-desc">
                {SORT_VALUE_MAP["personal-rating-desc"]}
              </SelectItem>
            </>
          ) : (
            <>
              <SelectItem value="added-desc">{SORT_VALUE_MAP["added-desc"]}</SelectItem>
              <SelectItem value="added-asc">{SORT_VALUE_MAP["added-asc"]}</SelectItem>
            </>
          )}

          <SelectItem value="rating-desc">{SORT_VALUE_MAP["rating-desc"]}</SelectItem>
          <SelectItem value="release-desc">{SORT_VALUE_MAP["release-desc"]}</SelectItem>
          {activeType !== "all" && (
            <>
              <SelectItem value="runtime-asc">{SORT_VALUE_MAP["runtime-asc"]}</SelectItem>
              <SelectItem value="runtime-desc">{SORT_VALUE_MAP["runtime-desc"]}</SelectItem>
            </>
          )}
          <SelectItem value="title-asc">{SORT_VALUE_MAP["title-asc"]}</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
