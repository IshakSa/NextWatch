"use client";

import { BookmarkIcon } from "lucide-react";
import { Button } from "../ui/button";

export default function AddWatchlistButton({
  className,
}: {
  className?: string;
}) {
  return (
    <Button variant={"outline"} className={className}>
      <BookmarkIcon />
      <p>Add Watchlist</p>
    </Button>
  );
}
