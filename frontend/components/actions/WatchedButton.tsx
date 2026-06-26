"use client";

import { useState } from "react";
import { Rating } from "react-simple-star-rating";
import { Button } from "../ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CheckIcon, EyeIcon } from "lucide-react";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const tooltipArray = [
  "Terrible",
  "Terrible+",
  "Bad",
  "Bad+",
  "Average",
  "Average+",
  "Great",
  "Great+",
  "Awesome",
  "Perfect",
];

const fillColorArray = [
  "#ef4444",
  "#f97316",
  "#f97316",
  "#f59e0b",
  "#f59e0b",
  "#eab308",
  "#eab308",
  "#eab308",
  "#eab308",
  "#ca8a04",
];

export default function WatchedButton({ className }: { className?: string }) {
  const [currentRating, setCurrentRating] = useState(0);
  const [savedRating, setSavedRating] = useState(0);
  const [watched, setWatched] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 640px)");

  const handleRating = (rate: number) => {
    setCurrentRating(rate);
  };

  const handleWatched = () => {
    if (watched) {
      setCurrentRating(0);
      setSavedRating(0);
      setIsPopoverOpen(false);
    } else {
      setIsPopoverOpen(true);
    }
    setWatched(!watched);
  };

  const handleSaveRating = (open: boolean) => {
    if (!open) {
      setSavedRating(currentRating);
      setIsPopoverOpen(false);
    }
  };

  const handleAutoClosePopover = () => {
    if (!isDesktop) {
      setTimeout(() => {
        setIsPopoverOpen(false);
      }, 500);
    } else {
      setIsPopoverOpen(false);
    }
  };

  return (
    <>
      <Popover onOpenChange={handleSaveRating} open={isPopoverOpen}>
        <PopoverTrigger
          render={
            <Button
              variant={watched ? "watched" : "outline"}
              onClick={handleWatched}
              size={"icon"}
              className={className}
            >
              {watched ? (
                <div className="flex space-x-2 items-center">
                  <CheckIcon />
                  {isDesktop && <p>Watched</p>}
                </div>
              ) : (
                <div className="flex space-x-2 items-center">
                  <EyeIcon />
                  {isDesktop && <p>Mark as Watched</p>}
                </div>
              )}
            </Button>
          }
        />
        <PopoverContent align="start" className="w-81 p-4">
          <div className="space-y-3">
            <p className="text-sm font-medium leading-none text-foreground">
              Rate it
            </p>

            <div className="flex items-center [&>.react-simple-star-rating]:flex [&>.react-simple-star-rating]:items-center [&>.react-simple-star-rating]:gap-2">
              <Rating
                onClick={(rate) => {
                  handleRating(rate);
                  handleAutoClosePopover();
                }}
                allowFraction
                showTooltip
                tooltipArray={tooltipArray}
                transition
                SVGclassName="inline"
                tooltipDefaultText="Your Rating"
                fillColorArray={fillColorArray}
                tooltipStyle={{
                  display: "inline-block",
                  margin: "0 0 0 8px",
                  padding: "4px 8px",
                  fontSize: "12px",
                  fontWeight: "500",
                  borderRadius: "4px",
                  backgroundColor: "var(--muted)",
                  color: "var(--muted-foreground)",
                }}
              />
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
}
