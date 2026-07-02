import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { ActiveType } from "./TypeTabs";

const SORT_VALUE_MAP = {
  "added-desc": "Recently added",
  "added-asc": "Oldest added",
  "rating-desc": "Top rated",
  "release-desc": "Newest release",
  "runtime-desc": "Longest",
  "runtime-asc": "Shortest",
  "title-asc": "Title (A–Z)",
} as const;

export type SortKey = keyof typeof SORT_VALUE_MAP;

export default function SortButton({
  sortedBy,
  setSortedBy,
  activeType,
}: {
  sortedBy: SortKey;
  setSortedBy: (newSortedBy: SortKey) => void;
  activeType: ActiveType;
}) {
  function handleSortChange(value: string | null) {
    if (value) {
      setSortedBy(value as SortKey);
    }
  }

  return (
    <Select value={sortedBy} onValueChange={handleSortChange}>
      <SelectTrigger className="w-40 rounded-lg">
        <span>{SORT_VALUE_MAP[sortedBy]}</span>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="added-desc">Recently added</SelectItem>
          <SelectItem value="added-asc">Oldest added</SelectItem>
          <SelectItem value="rating-desc">Top rated</SelectItem>
          <SelectItem value="release-desc">Newest release</SelectItem>
          {activeType !== "all" && (
            <>
              <SelectItem value="runtime-asc">Shortest</SelectItem>
              <SelectItem value="runtime-desc">Longest</SelectItem>
            </>
          )}
          <SelectItem value="title-asc">Title (A–Z)</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
