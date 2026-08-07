"use client";

import { useState } from "react";
import { Button } from "../../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import EditStarIcon from "../../icons/EditStarIcon";
import StarRating from "../../shared/StarRating";
import { addWatched } from "@/components/actions/WatchlistButtons/actions";
import { ContentType } from "@/types";
import posthog from "posthog-js";

export default function EditRatingButton({
  className,
  initialUserRating,
  contentId,
  contentType,
}: {
  className?: string;
  initialUserRating: number;
  contentId: number;
  contentType: ContentType;
}) {
  const [savedRating, setSavedRating] = useState<number>(initialUserRating);
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

  async function handleEditRating() {
    if (isPopoverOpen) {
      setIsPopoverOpen(false);
      return;
    }

    setIsPopoverOpen(true);
  }

  async function handleSaveRating(rating: number) {
    setSavedRating(rating);
    await addWatched(contentId, contentType, rating);
    posthog.capture("content_rating_saved", {
      content_id: contentId,
      content_type: contentType,
      rating,
    });
  }

  return (
    <>
      <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
        <PopoverTrigger
          render={
            <Button
              variant={"outline"}
              onClick={handleEditRating}
              size={"icon"}
              className={className}
            >
              <div className="flex space-x-2 items-center">
                <EditStarIcon />
              </div>
            </Button>
          }
        />
        <PopoverContent align="start" className="w-81 p-4">
          <div className="space-y-3">
            <p className="text-sm font-medium leading-none text-foreground">Edit your Rating</p>

            <StarRating
              handleRating={handleSaveRating}
              handleAutoClosePopover={handleAutoClosePopover}
              initialRate={savedRating}
            />
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
}
