"use client";

import { toDisplayContentType, toDisplayContentLength } from "@/lib/utils";
import { BookmarkIcon, StarIcon } from "lucide-react";
import ExpandableOverview from "../../shared/ExpandableOverview";
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from "../../ui/carousel";
import { Badge } from "../../ui/badge";
import { ContentItem } from "@/types";
import { useEffect, useRef, useState } from "react";
import ImageLoader from "../../shared/ImageLoader";
import { ImageSizes } from "@/lib/constants";
import WatchedButton from "../../actions/WatchedButton";
import ShareButton from "../../actions/ShareButton";
import DiscoverEmbeddedVideo from "../../shared/DiscoverEmbeddedVideo";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import AddWatchlistButton, { ChildRefActions } from "../../actions/AddWatchlistButton";

export default function DiscoverCarousel({ content }: { content: ContentItem[] }) {
  const [api, setApi] = useState<CarouselApi>();
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const alreadyScrolled = useRef<boolean>(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const isHighScreen = useMediaQuery("(min-height: 768px)");
  const isDoubleClickLocked = useRef(false);
  const addWatchlistButtonRefs = useRef<ChildRefActions[]>([]);
  const [animatingSlideIndex, setAnimatingSlideIndex] = useState<number | null>(null);

  useEffect(() => {
    const container = sliderRef.current;

    if (!api) return;
    if (!container) return;

    const handleScroll = (event: WheelEvent) => {
      if (alreadyScrolled.current) return;

      alreadyScrolled.current = true;
      if (event.deltaY > 0) api.scrollNext();
      else api.scrollPrev();

      setTimeout(() => {
        alreadyScrolled.current = false;
      }, 500);
    };

    container.addEventListener("wheel", handleScroll, { passive: true });

    return () => container.removeEventListener("wheel", handleScroll);
  }, [api]);

  useEffect(() => {
    api?.on("select", () => {
      setTimeout(() => {
        setCurrentSlide(api.selectedScrollSnap());
      }, 300);
    });
  }, [api]);

  function handleDoubleClick() {
    if (isDoubleClickLocked.current) return;

    isDoubleClickLocked.current = true;

    setTimeout(() => {
      isDoubleClickLocked.current = false;
    }, 400);

    if (!addWatchlistButtonRefs.current[currentSlide]?.isSavedState) {
      addWatchlistButtonRefs.current[currentSlide]?.triggerChildFunction();
    }
    setAnimatingSlideIndex(currentSlide);

    setTimeout(() => {
      setAnimatingSlideIndex(null);
    }, 700);
  }

  return (
    <Carousel
      orientation="vertical"
      className="w-full dark"
      setApi={setApi}
      ref={sliderRef}
      onDoubleClick={handleDoubleClick}
    >
      <CarouselContent className="-mt-1 h-screen">
        {content.map((item, index) => {
          const imagePath = isDesktop ? item.backdropPath : item.posterPath;
          const imageSize = isDesktop ? ImageSizes.backdrop : ImageSizes.poster;
          const isVideoShown = currentSlide === index ? true : false;

          return (
            <CarouselItem key={index} className="relative">
              <>
                {animatingSlideIndex === index && (
                  <div className="absolute inset-0 z-40 flex items-center justify-center pointer-events-none">
                    <div className="animate-ping-fade-up flex flex-col items-center justify-center p-6 rounded-3xl bg-zinc-950/40 backdrop-blur-sm border border-white/10 shadow-2xl">
                      <BookmarkIcon size={64} className="text-primary" fill="currentColor" />
                      <span className="text-white text-sm font-semibold mt-2 tracking-wide drop-shadow-md">
                        Saved
                      </span>
                    </div>
                  </div>
                )}

                <div className="h-full items-center justify-center bg-zinc-950/70 backdrop-blur-md">
                  <ImageLoader
                    src={imagePath}
                    alt="content backdrop"
                    apiWidth={imageSize}
                    className="object-cover "
                    fill
                  />
                  <div className="dark absolute bottom-0 left-0 right-0 h-full bg-linear-to-t from-background to-transparent" />
                </div>

                <div className="absolute mb-0 z-10 bottom-1/7 w-screen h-screen">
                  <DiscoverEmbeddedVideo youtubeId={item.trailerId} showVideo={isVideoShown} />
                </div>

                <div
                  className={`absolute ${isHighScreen ? "bottom-20" : "bottom-15"} w-8/10 z-100 flex justify-between select-none container`}
                >
                  <div>
                    {isHighScreen && (
                      <ImageLoader
                        src={item.posterPath}
                        alt={item.title}
                        apiWidth={ImageSizes.poster}
                        width={88}
                        height={132}
                        className="mb-5 rounded-xl shadow-2xl ring-1 ring-white/10"
                      />
                    )}

                    <div className="flex space-x-2 mb-4">
                      <Badge variant="outline" className="p-3">
                        {toDisplayContentType(item.type)}
                      </Badge>
                      <Badge className="p-3" variant="outline">
                        <div className="flex items-center text-sm">
                          <StarIcon size={15} color="#eab308" fill="#eab308" />
                          <p className="mx-1">{item.rating}</p>
                        </div>
                      </Badge>
                    </div>

                    <h1 className="tracking-tight text-2xl">{item.title}</h1>

                    <p className="text-foreground/50 dark:text-muted-foreground text-sm my-2">
                      {toDisplayContentLength(item.type, item.length)} •{" "}
                      {item.releaseDate.slice(0, 4)} • {item.genres?.join(" • ")}
                    </p>

                    <ExpandableOverview page="home" text={item.overview} />
                  </div>
                </div>

                <div
                  className={`absolute right-4 ${isHighScreen ? "bottom-30" : "bottom-15"} z-50 flex flex-col items-center gap-7`}
                >
                  <div className="flex w-16 flex-col items-center gap-2 scale-105">
                    <AddWatchlistButton
                      page="details"
                      className="flex h-12 w-12 rounded-full backdrop-blur-xl"
                      ref={(currentButton) => {
                        if (currentButton) addWatchlistButtonRefs.current[index] = currentButton;
                      }}
                    />
                    <span className="text-xs text-foreground/95">Save</span>
                  </div>

                  <div className="flex w-16 flex-col items-center gap-2 scale-105">
                    <WatchedButton
                      hideText
                      className="flex h-12 w-12 rounded-full backdrop-blur-xl"
                    />
                    <span className="text-xs text-foreground/95">Watched</span>
                  </div>

                  <div className="flex w-16 flex-col items-center gap-2 scale-105">
                    <ShareButton className="flex h-12 w-12 rounded-full backdrop-blur-xl" />
                    <span className="text-xs text-foreground/95">Share</span>
                  </div>
                </div>
              </>
            </CarouselItem>
          );
        })}
      </CarouselContent>
    </Carousel>
  );
}
