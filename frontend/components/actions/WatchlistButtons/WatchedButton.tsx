"use client";

import { useState } from "react";
import { Button } from "../../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CheckIcon, EyeIcon } from "lucide-react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import StarRating from "../../shared/StarRating";
import { ContentType } from "@/types";
import { addWatched, removeWatchlist } from "@/components/actions/WatchlistButtons/actions";
import ProtectedButton from "@/components/shared/ProtectedButton";

export default function WatchedButton({
  className,
  hideText,
  watchedInitialState,
  contentId,
  contentType,
  isLoggedIn,
}: {
  className?: string;
  hideText?: boolean;
  watchedInitialState: boolean;
  contentId: number;
  contentType: ContentType;
  isLoggedIn: boolean;
}) {
  const [savedRating, setSavedRating] = useState<number | null>(null);
  const [watched, setWatched] = useState(watchedInitialState);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 640px)");

  function handleAutoClosePopover() {
    if (!isDesktop) {
      setTimeout(() => {
        setIsPopoverOpen(false);
      }, 500);
    } else {
      setIsPopoverOpen(false);
    }
  }

  async function handleWatched() {
    const newWatchedState = !watched;
    setWatched(newWatchedState);

    if (newWatchedState) {
      setIsPopoverOpen(true);

      await addWatched(contentId, contentType, 0);
      return;
    }

    setIsPopoverOpen(false);
    await removeWatchlist(contentId);
  }

  async function handleSaveRating(rating: number) {
    setSavedRating(rating);
    await addWatched(contentId, contentType, rating);
  }

  return (
    <>
      <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
        <PopoverTrigger
          render={
            <ProtectedButton isLoggedIn={isLoggedIn} buttonAction={handleWatched}>
              <Button variant={watched ? "watched" : "outline"} size={"icon"} className={className}>
                {watched ? (
                  <div className="flex space-x-2 items-center">
                    <CheckIcon />
                    {isDesktop && !hideText && <p>Watched</p>}
                  </div>
                ) : (
                  <div className="flex space-x-2 items-center">
                    <EyeIcon />
                    {isDesktop && !hideText && <p>Mark as Watched</p>}
                  </div>
                )}
              </Button>
            </ProtectedButton>
          }
        />
        <PopoverContent align="start" className="w-81 p-4">
          <div className="space-y-3">
            <p className="text-sm font-medium leading-none text-foreground">Rate it</p>

            <StarRating
              handleRating={handleSaveRating}
              handleAutoClosePopover={handleAutoClosePopover}
            />
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
}
