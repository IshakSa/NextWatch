"use client";

import { BookmarkCheck, BookmarkIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useState } from "react";
import { toast } from "sonner";

export default function AddWatchlistButton({
  className,
  page,
}: {
  className?: string;
  page: "home" | "details";
}) {
  const [isSaved, setIsSaved] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 640px)");

  const removedToast = () => {
    toast.success("Removed from watchlist");
  };

  const addedToast = (previousState: boolean) => {
    toast("Added to watchlist", {
      description: "Saved to your list successfully.",
      icon: <BookmarkCheck className="h-5 w-5 text-primary" />,
      action: {
        label: "Undo",
        onClick: () => {
          removedToast();
          setIsSaved(previousState);
        },
      },
    });
  };

  function handleAddWatchlist() {
    const previousState = isSaved;
    const newState = !isSaved;

    setIsSaved(newState);
    if (newState) {
      addedToast(previousState);
    } else {
      removedToast();
    }
  }

  return (
    <Button variant={"outline"} className={className} size={"icon"} onClick={handleAddWatchlist}>
      <div className="flex space-x-2 items-center">
        <BookmarkIcon fill={isSaved ? "var(--foreground)" : "none"} />
        {((isDesktop && page === "details") || page === "home") && (
          <p>{isSaved ? "Added to Watchlist" : "Add Watchlist"}</p>
        )}
      </div>
    </Button>
  );
}
