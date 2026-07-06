import { useState, useRef } from "react";
import YouTube, { YouTubeProps } from "react-youtube";
import { Button } from "@/components/ui/button"; // Passe den Importpfad für deine Button-Komponente an
import { Volume2Icon, VolumeOffIcon } from "lucide-react";

export default function DiscoverEmbeddedVideo({
  youtubeId,
  showVideo,
}: {
  youtubeId?: string;
  showVideo: boolean;
}) {
  const [isMuted, setIsMuted] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const playerRef = useRef<any>(null);

  function handleMute() {
    if (playerRef.current) {
      if (isMuted) {
        playerRef.current.unMute();
        setIsMuted(false);
      } else {
        playerRef.current.mute();
        setIsMuted(true);
      }
    }
  }

  const opts: YouTubeProps["opts"] = {
    height: "100%",
    width: "100%",
    playerVars: {
      autoplay: 1,
      mute: 1,
      controls: 0,
      modestbranding: 1,
      rel: 0,
      playsinline: 1,
      vq: "highres",
    },
  };

  const onPlayerReady: YouTubeProps["onReady"] = (event) => {
    playerRef.current = event.target;

    if (isMuted) {
      playerRef.current.mute();
    } else {
      playerRef.current.unMute();
    }
  };

  return (
    <div className="z-10 w-screen h-full flex items-center justify-center bg-zinc-950/70 backdrop-blur-md">
      <div className="z-5 w-full sm:max-w-[80%] lg:max-w-[65%] mx-auto sm:px-4">
        <div className="relative aspect-video sm:rounded-xl overflow-hidden">
          {showVideo && (
            <>
              {youtubeId ? (
                <>
                  <YouTube
                    videoId={youtubeId}
                    opts={opts}
                    onReady={onPlayerReady}
                    className="absolute top-0 left-0 w-full h-full"
                    iframeClassName="w-full h-full"
                  />

                  <Button
                    className="absolute bottom-4 right-4 backdrop-blur-xl"
                    onClick={handleMute}
                    variant="outline"
                  >
                    <div className="flex gap-2 items-center">
                      {isMuted ? (
                        <>
                          <VolumeOffIcon />
                          Muted
                        </>
                      ) : (
                        <>
                          <Volume2Icon />
                          Mute
                        </>
                      )}
                    </div>
                  </Button>
                </>
              ) : (
                <div className="flex absolute top-0 left-0 w-full h-full justify-center items-center">
                  <p className="text-xl font-semibold text-white">Trailer is not available</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
