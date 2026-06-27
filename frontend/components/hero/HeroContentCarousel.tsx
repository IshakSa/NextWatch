"use client";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import HeroSection from "./HeroSection";
import { useEffect, useState } from "react";
import { ContentItem } from "@/types";

export default function HeroContentCarousel({
  content,
}: {
  content: ContentItem[];
}) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  function handleDotClick(index: number) {
    if (!api) return;
    const autoplay = api.plugins().autoplay;

    autoplay.stop();
    api.scrollTo(index);
    autoplay.play();
  }

  return (
    <div>
      <Carousel
        plugins={[
          Autoplay({
            delay: 6000,
          }),
        ]}
        opts={{
          loop: true,
        }}
        setApi={setApi}
        className="relative"
      >
        <CarouselContent>
          {content.map((item) => (
            <CarouselItem key={item.id}>
              <HeroSection contentItem={item} page="home" />
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 sm:bottom-10 sm:right-10 md:right-20 xl:right-40 sm:left-auto sm:translate-x-0 flex space-x-2 py-2 text-center text-sm text-muted-foreground">
          {[0, 1, 2, 3, 4].map((index) => {
            return (
              <div
                key={index}
                className={`${current - 1 === index ? "text-foreground" : "text-muted-foreground/50"}`}
              >
                <button
                  className="cursor-pointer text-xs sm:text-[14px]"
                  onClick={() => handleDotClick(index)}
                >
                  ⬤
                </button>
              </div>
            );
          })}
        </div>
      </Carousel>
    </div>
  );
}
