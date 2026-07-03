import WatchlistCard from "@/components/cards/WatchlistCard";
import { WatchTabType } from "../WatchTab";
import { WatchedItem, WatchlistItem } from "@/types/user";

export default function WatchGrid({
  displayedContent,
  deleteContentItemById,
  type,
}: {
  displayedContent: WatchlistItem[] | WatchedItem[];
  deleteContentItemById: (contentItemId: number) => void;
  type: WatchTabType;
}) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-6">
      {displayedContent.map((contentItem, index) => (
        <div key={index} className="cursor-pointer">
          <WatchlistCard
            contentItem={contentItem}
            deleteContentItemById={deleteContentItemById}
            type={type}
          />
        </div>
      ))}
    </div>
  );
}
