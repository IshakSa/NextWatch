"use client";

import { Button } from "@/components/ui/button";
import { PlayIcon } from "lucide-react";

export default function TrailerButton({
  className,
  isVideoPlaying,
  setIsVideoPlaying,
}: {
  className?: string;
  isVideoPlaying: boolean;
  setIsVideoPlaying: (isPlaying: boolean) => void;
}) {
  function handlePlayVideo() {
    setIsVideoPlaying(!isVideoPlaying);
  }

  return (
    <Button onClick={handlePlayVideo} className={className}>
      <PlayIcon />
      <p>Watch Trailer</p>
    </Button>
  );
}
