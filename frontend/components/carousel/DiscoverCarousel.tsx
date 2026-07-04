"use client";

import { toDisplayContentType, toDisplayContentLength } from "@/lib/utils";
import { StarIcon } from "lucide-react";
import ExpandableOverview from "../shared/ExpandableOverview";
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from "../ui/carousel";
import { Badge } from "../ui/badge";
import { ContentItem } from "@/types";
import { useEffect, useRef, useState } from "react";
import EmbeddedVideo from "../shared/EmbeddedVideo";
import ImageLoader from "../shared/ImageLoader";
import { ImageSizes } from "@/lib/constants";
import { Button } from "../ui/button";
import WatchedButton from "../actions/WatchedButton";
import AddWatchlistButton from "../actions/AddWatchlistButton";
import ShareButton from "../actions/ShareButton";

export default function DiscoverCarousel({ content }: { content: ContentItem[] }) {
  const [api, setApi] = useState<CarouselApi>();
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const alreadyScrolled = useRef<boolean>(false);

  useEffect(() => {
    const container = sliderRef.current;

    if (!api) return;
    if (!container) return;

    const handleScroll = (event: WheelEvent) => {
      if (alreadyScrolled.current) return;

      alreadyScrolled.current = true;
      if (event.deltaY > 0) api.scrollNext();
      else api.scrollPrev();

      console.log("scrolled");

      setTimeout(() => {
        alreadyScrolled.current = false;
      }, 500);
    };

    container.addEventListener("wheel", handleScroll, { passive: true });

    return () => container.removeEventListener("wheel", handleScroll);
  }, [api]);

  return (
    <Carousel orientation="vertical" className="w-full" setApi={setApi} ref={sliderRef}>
      <CarouselContent className="-mt-1 h-screen">
        {content.map((item, index) => (
          <CarouselItem key={index} className="relative">
            <>
              <div className="h-full items-center justify-center bg-zinc-950/70 backdrop-blur-md">
                <ImageLoader
                  src={item.posterPath}
                  alt="content backdrop"
                  apiWidth={ImageSizes.poster}
                  className="object-cover "
                  fill
                />
                <div className="absolute inset-0 bg-zinc-950/70 backdrop-blur-md z-10 pointer-events-none" />
                <div className="dark absolute bottom-0 left-0 right-0 h-full bg-linear-to-t from-background to-transparent" />
              </div>

              <div className="absolute z-100 bottom-0 mb-30 max-w-8/10 container">
                <div className="mb-10">
                  <EmbeddedVideo
                    setIsVideoPlaying={() => {}}
                    youtubeId={item.trailerId}
                    autoplay={false}
                    blurBg={false}
                  />
                </div>

                <div className="flex justify-between">
                  <div>
                    <div className="flex space-x-2 mb-5">
                      <Badge variant="secondary" className="px-3 py-2.5">
                        {toDisplayContentType(item.type)}
                      </Badge>
                      <Badge className="px-3 py-2.5" variant="secondary">
                        <div className="flex items-center text-sm">
                          <StarIcon size={15} color="#eab308" fill="#eab308" />
                          <p className="mx-1">{item.rating}</p>
                        </div>
                      </Badge>
                    </div>

                    <h1>{item.title}</h1>

                    <p className="text-foreground/50 dark:text-muted-foreground text-sm my-2">
                      {toDisplayContentLength(item.type, item.length)} •{" "}
                      {item.releaseDate.slice(0, 4)} • {item.genres?.join(" • ")}
                    </p>

                    <ExpandableOverview page="home" text={item.overview} />
                  </div>

                  <div className="flex flex-col gap-5 z-100">
                    <WatchedButton hideText />
                    <AddWatchlistButton page="details" />
                    <ShareButton />
                  </div>
                </div>
              </div>
            </>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
