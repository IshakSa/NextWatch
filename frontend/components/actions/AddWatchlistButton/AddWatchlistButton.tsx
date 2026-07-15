"use client";

import { BookmarkCheck, BookmarkIcon } from "lucide-react";
import { Button } from "../../ui/button";
import { forwardRef, useImperativeHandle, useState } from "react";
import { toast } from "sonner";
import { addWatchlist, removeWatchlist } from "@/components/actions/AddWatchlistButton/actions";
import { ContentType } from "@/types";

export interface ChildRefActions {
  triggerChildFunction: () => void;
  isSavedState: boolean;
}

interface AddWatchlistButtonProps {
  className?: string;
  hideText?: boolean;
  contentId: number;
  contentType: ContentType;
  savedInitialState: boolean;
}

const AddWatchlistButton = forwardRef<ChildRefActions, AddWatchlistButtonProps>(
  (
    { className, hideText, contentId, contentType, savedInitialState }: AddWatchlistButtonProps,
    ref,
  ) => {
    const [isSaved, setIsSaved] = useState(savedInitialState);

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

    async function handleAddWatchlist() {
      try {
        const previousState = isSaved;
        const newState = !isSaved;

        setIsSaved(newState);
        if (newState) {
          addedToast(previousState);
          await addWatchlist(contentId, contentType);
        } else {
          removedToast();
          await removeWatchlist(contentId);
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          toast.error(error.message);
        }
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
