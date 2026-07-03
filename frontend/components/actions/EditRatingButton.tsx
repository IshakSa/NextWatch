"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import EditStarIcon from "../icons/EditStarIcon";
import StarRating from "../shared/StarRating";

export default function EditRatingButton({ className }: { className?: string }) {
  const [currentRating, setCurrentRating] = useState(0);
  const [savedRating, setSavedRating] = useState(0);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 640px)");

  const handleWatchedOnButtonClick = () => {
    setIsPopoverOpen(true);
  };

  const handleSaveRatingOnPopoverChange = (open: boolean) => {
    if (!open) {
      setSavedRating(currentRating);
      setIsPopoverOpen(false);
    }
  };

  const handleRatingOnStarClick = (rate: number) => {
    setCurrentRating(rate);
  };

  const handleAutoClosePopover = (rate: number) => {
    if (!isDesktop) {
      setTimeout(() => {
        setIsPopoverOpen(false);
      }, 500);
    } else {
      setIsPopoverOpen(false);
    }
    setSavedRating(rate);
  };

  return (
    <>
      <Popover onOpenChange={handleSaveRatingOnPopoverChange} open={isPopoverOpen}>
        <PopoverTrigger
          render={
            <Button
              variant={"outline"}
              onClick={handleWatchedOnButtonClick}
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
              handleRating={handleRatingOnStarClick}
              handleAutoClosePopover={handleAutoClosePopover}
              initialRate={currentRating}
            />
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
}
