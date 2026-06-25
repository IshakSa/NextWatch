"use client";

import { XIcon } from "lucide-react";
import { Button } from "../ui/button";

export default function EmbeddedVideo({
  youtubeId,
  setIsVideoPlaying,
}: {
  youtubeId: string;
  setIsVideoPlaying: (isPlaying: boolean) => void;
}) {
  function handleClose() {
    setIsVideoPlaying(false);
  }

  return (
    <div
      onClick={handleClose}
      className="z-10 w-screen h-full flex items-center justify-center bg-zinc-950/70 backdrop-blur-md"
    >
      <div className="z-5 w-full sm:max-w-[80%] lg:max-w-[65%] xl:max-w-[50%] mx-auto sm:px-4">
        <div className="relative aspect-video sm:rounded-xl overflow-hidden">
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src={`https://www.youtube.com/embed/${youtubeId}?playsinline=1&autoplay=1&modestbranding=1&rel=0`}
            allow="accelerometer; clipboard-write; autoplay; encrypted-media;"
            allowFullScreen
            loading="lazy"
          />
          <div className="absolute right-0 m-5">
            <Button variant={"secondary"} onClick={handleClose}>
              <XIcon />
            </Button>
          </div>
        </div>
      </div>
      <div className="dark absolute top-0 left-0 right-0 h-1/4 bg-linear-to-b from-background to-transparent opacity-50" />
      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-linear-to-t from-background to-transparent" />
    </div>
  );
}
