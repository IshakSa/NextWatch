"use client";

import { Carousel, CarouselApi, CarouselContent, CarouselItem } from "../../ui/carousel";
import { ContentItem } from "@/types";
import { useEffect, useRef, useState } from "react";
import ImageLoader from "../../shared/ImageLoader";
import { ImageSizes } from "@/lib/constants";
import DiscoverEmbeddedVideo from "../../shared/DiscoverEmbeddedVideo";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { ChildRefActions } from "../../actions/AddWatchlistButton";
import DiscoverDetails from "./DiscoverDetails";
import DiscoverActions from "./DiscoverActions";
import SavedFlash from "./SavedFlash";

export default function DiscoverCarousel({ content }: { content: ContentItem[] }) {
  const [api, setApi] = useState<CarouselApi>();
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const alreadyScrolled = useRef<boolean>(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const isDesktop = useMediaQuery("(min-width: 1024px)");
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
    }, 950);
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
                {animatingSlideIndex === index && <SavedFlash />}

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

                <DiscoverDetails item={item} />

                <DiscoverActions
                  onRegisterRef={(currentButton) => {
                    if (currentButton) addWatchlistButtonRefs.current[index] = currentButton;
                  }}
                />
              </>
            </CarouselItem>
          );
        })}
      </CarouselContent>
    </Carousel>
  );
}
