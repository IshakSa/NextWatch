"use client";

import Image, { ImageProps } from "next/image";
import type { Image as ImageType } from "@/types";
import { IMAGE_FALLBACK_SRC, IMAGE_SIZES } from "@/lib/constants";

interface CustomImageProps extends Omit<ImageProps, "src"> {
  src: string;
  imageType: ImageType;
}

export default function ImageLoader({ src, alt, imageType, ...props }: CustomImageProps) {
  const imageLoader = ({ src }: { src: string }) => {
    return `https://image.tmdb.org/t/p/w${IMAGE_SIZES[imageType]}${src}`;
  };

  if (!src) {
    return <Image src={IMAGE_FALLBACK_SRC[imageType]} alt={alt} {...props} />;
  }
  return <Image loader={imageLoader} src={src} alt={alt} {...props} />;
}
