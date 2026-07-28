"use client";

import { Carousel, CarouselApi, CarouselContent } from "../../ui/carousel";
import { ContentItem, Image } from "@/types";
import { Fragment, useEffect, useRef, useState } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { ChildRefActions } from "../../actions/WatchlistButtons/AddWatchlistButton";
import MobileDiscoverItem from "./_components/MobileDiscoverItem";
import DesktopDiscoverItem from "./_components/DesktopDiscoverItem";
import { FilterProvider } from "./_components/FilterContext";
import fetchNextRecommendations from "@/app/(no-footer)/discover/actions";

type StoredSeenRecommendations = {
  expiresAt: number;
  seenIds: number[];
};

// 1 Week
const getExpirationTimeMs = () => Date.now() + 7 * 24 * 60 * 60 * 1000;

const getStoredSeenContent = () => {
  const storedSeenRecommendations = localStorage.getItem("seen_recommendations");
  const seenRecommendations: StoredSeenRecommendations = storedSeenRecommendations
    ? JSON.parse(storedSeenRecommendations)
    : { expiresAt: getExpirationTimeMs(), seenIds: [] };
  return seenRecommendations;
};

const revalidateStoredSeenContent = () => {
  const currentTimeMs = Date.now();
  const seenContent = getStoredSeenContent();
  if (seenContent.expiresAt <= currentTimeMs) {
    localStorage.setItem(
      "seen_recommendations",
      JSON.stringify({
        expiresAt: getExpirationTimeMs(),
        seenIds: [],
      }),
    );
    return;
  }
};

const updateStoredSeenContent = (newLocalContentIds: number[]) => {
  const seenContent = getStoredSeenContent();
  localStorage.setItem(
    "seen_recommendations",
    JSON.stringify({
      expiresAt: seenContent.expiresAt,
      seenIds: Array.from(new Set([...seenContent.seenIds, ...newLocalContentIds])),
    }),
  );
};

export default function DiscoverCarousel() {
  const [localContent, setLocalContent] = useState<ContentItem[]>([]);
  const [api, setApi] = useState<CarouselApi>();
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const alreadyScrolled = useRef<boolean>(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const isDoubleClickLocked = useRef(false);
  const addWatchlistButtonRefs = useRef<ChildRefActions[]>([]);
  const [animatingSlideIndex, setAnimatingSlideIndex] = useState<number | null>(null);

  useEffect(() => {
    revalidateStoredSeenContent();

    const loadContent = async () => {
      const content = await fetchNextRecommendations(getStoredSeenContent().seenIds);
      setLocalContent(content);
      updateStoredSeenContent(content.map((content) => content.id));
    };
    loadContent();
  }, []);

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

  // useEffect(() => {
  //   if (!localContent || !localContent[currentSlide]) return;
  //
  //
  //   const currentSeenItem = localContent[currentSlide].id;
  //
  //   const hasNotSeenYet = !seenContent.seenIds.includes(currentSeenItem);
  //
  // }, [currentSlide, localContent]);

  useEffect(() => {
    const seenContent = getStoredSeenContent();
    const fetchNewBatch = async () => {
      const newContent = await fetchNextRecommendations(seenContent.seenIds);

      setLocalContent((prevContent) => {
        const newLocalContent = [...prevContent, ...newContent];
        const newLocalContentIds = newLocalContent.map((contentItem) => contentItem.id);
        updateStoredSeenContent(newLocalContentIds);

        return newLocalContent;
      });
    };

    if (localContent.length - currentSlide === 5) {
      fetchNewBatch();
    }
  }, [currentSlide, localContent.length]);

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
    <Carousel orientation="vertical" className="w-full dark" setApi={setApi} ref={sliderRef}>
      <CarouselContent className="-mt-1 h-screen">
        <FilterProvider>
          {localContent.map((item, index) => {
            const imagePath = isDesktop ? item.backdropPath : item.posterPath;
            const imageType: Image = isDesktop ? "backdrop" : "poster";
            const isVideoShown = currentSlide === index;

            return (
              <Fragment key={item.id}>
                {isDesktop ? (
                  <DesktopDiscoverItem
                    item={item}
                    imagePath={imagePath}
                    imageType={imageType}
                    animatingSlideIndex={animatingSlideIndex}
                    index={index}
                    onRegisterRef={(currentButton) => {
                      if (currentButton) addWatchlistButtonRefs.current[index] = currentButton;
                    }}
                    isVideoShown={isVideoShown}
                    handleDoubleClick={handleDoubleClick}
                  />
                ) : (
                  <MobileDiscoverItem
                    item={item}
                    imagePath={imagePath}
                    imageType={imageType}
                    animatingSlideIndex={animatingSlideIndex}
                    index={index}
                    onRegisterRef={(currentButton) => {
                      if (currentButton) addWatchlistButtonRefs.current[index] = currentButton;
                    }}
                    isVideoShown={isVideoShown}
                    handleDoubleClick={handleDoubleClick}
                  />
                )}
              </Fragment>
            );
          })}
        </FilterProvider>
      </CarouselContent>
    </Carousel>
  );
}
