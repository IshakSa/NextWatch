"use client";

import { Carousel, CarouselApi, CarouselContent } from "../../ui/carousel";
import { ContentItem } from "@/types";
import { useEffect, useRef, useState } from "react";
import { ImageSizes } from "@/lib/constants";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { ChildRefActions } from "../../actions/AddWatchlistButton";
import MobileDiscoverItem from "./_components/MobileDiscoverItem";
import DesktopDiscoverItem from "./_components/DesktopDiscoverItem";
import { FilterProvider } from "./_components/FilterContext";

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
        <FilterProvider>
          {content.map((item, index) => {
            const imagePath = isDesktop ? item.backdropPath : item.posterPath;
            const imageSize = isDesktop ? ImageSizes.backdrop : ImageSizes.poster;
            const isVideoShown = currentSlide === index ? true : false;

            return (
              <>
                {isDesktop ? (
                  <DesktopDiscoverItem
                    key={item.id}
                    item={item}
                    imagePath={imagePath}
                    imageSize={imageSize}
                    animatingSlideIndex={animatingSlideIndex}
                    index={index}
                    onRegisterRef={(currentButton) => {
                      if (currentButton) addWatchlistButtonRefs.current[index] = currentButton;
                    }}
                    isVideoShown={isVideoShown}
                  />
                ) : (
                  <MobileDiscoverItem
                    key={item.id}
                    item={item}
                    imagePath={imagePath}
                    imageSize={imageSize}
                    animatingSlideIndex={animatingSlideIndex}
                    index={index}
                    onRegisterRef={(currentButton) => {
                      if (currentButton) addWatchlistButtonRefs.current[index] = currentButton;
                    }}
                    isVideoShown={isVideoShown}
                  />
                )}
              </>
            );
          })}
        </FilterProvider>
      </CarouselContent>
    </Carousel>
  );
}
