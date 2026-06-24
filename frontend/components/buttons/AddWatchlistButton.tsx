"use client";

import { BookmarkIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useState } from "react";

export default function AddWatchlistButton({
  className,
  page,
}: {
  className?: string;
  page: "home" | "details";
}) {
  const [isSaved, setIsSaved] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 640px)");

  function handleAddWatchlist() {
    setIsSaved(!isSaved);
  }

  return (
    <Button
      variant={"outline"}
      className={className}
      size={"icon"}
      onClick={handleAddWatchlist}
    >
      <div className="flex space-x-2 items-center">
        <BookmarkIcon fill={isSaved ? "#ffffff" : "none"} />
        {((isDesktop && page === "details") || page === "home") && (
          <p>{isSaved ? "Added to Watchlist" : "Add Watchlist"}</p>
        )}
      </div>
    </Button>
  );
}
