import AddWatchlistButton, { ChildRefActions } from "@/components/actions/AddWatchlistButton";
import ShareButton from "@/components/actions/ShareButton";
import WatchedButton from "@/components/actions/WatchedButton";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export default function DiscoverActions({
  onRegisterRef,
}: {
  onRegisterRef: (currentButton: ChildRefActions) => void;
}) {
  const isHighScreen = useMediaQuery("(min-height: 768px)");

  return (
    <div
      className={`absolute right-4 ${isHighScreen ? "bottom-30" : "bottom-15"} z-50 flex flex-col items-center gap-7`}
    >
      <div className="flex w-16 flex-col items-center gap-2 scale-105">
        <AddWatchlistButton
          className="flex h-12 w-12 rounded-full backdrop-blur-xl"
          ref={onRegisterRef}
          hideText
        />
        <span className="text-xs text-foreground/95">Save</span>
      </div>

      <div className="flex w-16 flex-col items-center gap-2 scale-105">
        <WatchedButton hideText className="flex h-12 w-12 rounded-full backdrop-blur-xl" />
        <span className="text-xs text-foreground/95">Watched</span>
      </div>

      <div className="flex w-16 flex-col items-center gap-2 scale-105">
        <ShareButton className="flex h-12 w-12 rounded-full backdrop-blur-xl" hideText />
        <span className="text-xs text-foreground/95">Share</span>
      </div>
    </div>
  );
}
