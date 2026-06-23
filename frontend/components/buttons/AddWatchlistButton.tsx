"use client";

import { BookmarkIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export default function AddWatchlistButton({
  className,
  page,
}: {
  className?: string;
  page: "home" | "details";
}) {
  const isDesktop = useMediaQuery("(min-width: 640px)");
  return (
    <Button variant={"outline"} className={className} size={"icon"}>
      <div className="flex space-x-2 items-center">
        <BookmarkIcon />
        {((isDesktop && page === "details") || page === "home") && (
          <p>Add Watchlist</p>
        )}
      </div>
    </Button>
  );
}
