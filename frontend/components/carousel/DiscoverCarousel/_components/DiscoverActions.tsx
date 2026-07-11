import AddWatchlistButton, {
  ChildRefActions
} from "@/components/actions/AddWatchlistButton/AddWatchlistButton";
import FilterButton from "@/components/actions/FilterButton/FilterButton";
import ShareButton from "@/components/actions/ShareButton";
import WatchedButton from "@/components/actions/WatchedButton";
import {ContentItem} from "@/types";

export default function DiscoverActions({
                                          onRegisterRef,
                                          screen,
                                          contentItem
                                        }: {
  onRegisterRef: (currentButton: ChildRefActions) => void;
  screen: "desktop" | "mobile";
  contentItem: ContentItem
}) {
  return (
    <div className={`flex ${screen === "mobile" ? "flex-col" : "flex-row"} items-center gap-7`}>
      <div className="flex w-16 flex-col items-center gap-2 scale-105">
        <AddWatchlistButton
          className="flex h-12 w-12 rounded-full backdrop-blur-xl"
          ref={onRegisterRef}
          hideText
          contentId={contentItem.id}
          contentType={contentItem.type}
        />
        <span className="text-xs text-foreground/95">Save</span>
      </div>

      <div className="flex w-16 flex-col items-center gap-2 scale-105">
        <WatchedButton hideText className="flex h-12 w-12 rounded-full backdrop-blur-xl"/>
        <span className="text-xs text-foreground/95">Watched</span>
      </div>

      <div className="flex w-16 flex-col items-center gap-2 scale-105">
        <ShareButton className="flex h-12 w-12 rounded-full backdrop-blur-xl" hideText/>
        <span className="text-xs text-foreground/95">Share</span>
      </div>

      {screen === "desktop" && (
        <div className="flex w-16 flex-col items-center gap-2 scale-105">
          <FilterButton className="flex h-12 w-12 rounded-full backdrop-blur-xl" screen="desktop"/>
          <span className="text-xs text-foreground/95">Filter</span>
        </div>
      )}
    </div>
  );
}
