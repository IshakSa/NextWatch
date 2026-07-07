"use client";

import { BookmarkCheck, BookmarkIcon } from "lucide-react";
import { Button } from "../ui/button";
import { forwardRef, useImperativeHandle, useState } from "react";
import { toast } from "sonner";

export interface ChildRefActions {
  triggerChildFunction: () => void;
  isSavedState: boolean;
}

interface AddWatchlistButtonProps {
  className?: string;
  hideText?: boolean;
}

const AddWatchlistButton = forwardRef<ChildRefActions, AddWatchlistButtonProps>(
  ({ className, hideText }: AddWatchlistButtonProps, ref) => {
    const [isSaved, setIsSaved] = useState(false);

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

    useImperativeHandle(ref, () => ({
      triggerChildFunction: handleAddWatchlist,
      isSavedState: isSaved,
    }));

    return (
      <Button variant={"outline"} className={className} size={"icon"} onClick={handleAddWatchlist}>
        <div className="flex space-x-2 items-center">
          <BookmarkIcon fill={isSaved ? "var(--foreground)" : "none"} />
          {!hideText && <p>{isSaved ? "Added to Watchlist" : "Add Watchlist"}</p>}
        </div>
      </Button>
    );
  },
);

AddWatchlistButton.displayName = "AddWatchlistButton";

export default AddWatchlistButton;
