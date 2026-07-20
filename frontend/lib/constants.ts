import { Image } from "@/types";

export const IMAGE_SIZES: Record<Image, number> = {
  hero: 1920,
  poster: 500,
  backdrop: 500,
  still: 500,
  provider: 154,
  credits: 185,
} as const;

export const IMAGE_FALLBACK_SRC: Record<Image, string> = {
  hero: "/fallback-hero.png",
  poster: "/fallback-poster.png",
  backdrop: "/fallback-backdrop.png",
  still: "/fallback-still.png",
  provider: "/fallback-provider.png",
  credits: "/fallback-credits.png",
} as const;
