"use client";

import { Button } from "@/components/ui/button";
import { PlayIcon } from "lucide-react";
import posthog from "posthog-js";

export default function TrailerButton({
  className,
  setIsVideoPlaying,
}: {
  className?: string;
  setIsVideoPlaying: (isPlaying: boolean) => void;
}) {
  function handlePlayVideo() {
    setIsVideoPlaying(true);
    posthog.capture("trailer_started");
  }

  return (
    <Button onClick={handlePlayVideo} className={className}>
      <PlayIcon />
      <p>Watch Trailer</p>
    </Button>
  );
}
