"use client";

import { Button } from "@/components/ui/button";
import { PlayIcon } from "lucide-react";

export default function TrailerButton({
  className,
  setIsVideoPlaying,
}: {
  className?: string;
  setIsVideoPlaying: (isPlaying: boolean) => void;
}) {
  function handlePlayVideo() {
    setIsVideoPlaying(true);
  }

  return (
    <Button onClick={handlePlayVideo} className={className}>
      <PlayIcon />
      <p>Watch Trailer</p>
    </Button>
  );
}
