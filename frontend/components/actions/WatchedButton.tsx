"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CheckIcon, EyeIcon } from "lucide-react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import StarRating from "../shared/StarRating";

export default function WatchedButton({
  className,
  hideText,
}: {
  className?: string;
  hideText?: boolean;
}) {
  const [currentRating, setCurrentRating] = useState(0);
  const [savedRating, setSavedRating] = useState(0);
  const [watched, setWatched] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 640px)");

  const handleWatchedOnButtonClick = () => {
    if (watched) {
      setCurrentRating(0);
      setSavedRating(0);
      setIsPopoverOpen(false);
    } else {
      setIsPopoverOpen(true);
    }
    setWatched(!watched);
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
              variant={watched ? "watched" : "outline"}
              onClick={handleWatchedOnButtonClick}
              size={"icon"}
              className={className}
            >
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
          }
        />
        <PopoverContent align="start" className="w-81 p-4">
          <div className="space-y-3">
            <p className="text-sm font-medium leading-none text-foreground">Rate it</p>

            <StarRating
              handleRating={handleRatingOnStarClick}
              handleAutoClosePopover={handleAutoClosePopover}
            />
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
}
