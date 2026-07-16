"use client";

import { BookmarkCheck, BookmarkIcon, Undo2Icon } from "lucide-react";
import { Button } from "../../ui/button";
import { forwardRef, useImperativeHandle, useState } from "react";
import { toast } from "sonner";
import { addWatchlist, removeWatchlist } from "@/components/actions/WatchlistButtons/actions";
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

    const undoToast = () => {
      toast.success("Added back to watchlist", {
        icon: <Undo2Icon />,
      });
    };

    const undoRemove = async (previousState: boolean) => {
      setIsSaved(previousState);
      undoToast();
      await addWatchlist(contentId, contentType);
    };

    const removedToast = (previousState: boolean) => {
      toast.success("Removed from watchlist", {
        action: {
          label: "Undo",
          onClick: async () => {
            await undoRemove(previousState);
          },
        },
      });
    };

    const addedToast = () => {
      toast("Added to watchlist", {
        description: "Saved to your list successfully.",
        icon: <BookmarkCheck className="h-5 w-5 text-primary" />,
      });
    };

    async function handleAddWatchlist() {
      try {
        const previousState = isSaved;
        const newState = !isSaved;

        setIsSaved(newState);
        if (newState) {
          addedToast();
          await addWatchlist(contentId, contentType);
        } else {
          removedToast(previousState);
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
