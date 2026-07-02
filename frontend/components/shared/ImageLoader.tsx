"use client";

import Image, { ImageProps } from "next/image";

interface CustomImageProps extends Omit<ImageProps, "src"> {
  src: string;
  apiWidth: number;
}

export default function ImageLoader({ src, alt, apiWidth, ...props }: CustomImageProps) {
  const imageLoader = ({ src }: { src: string }) => {
    return `https://image.tmdb.org/t/p/w${apiWidth}${src}`;
  };

  return <Image loader={imageLoader} src={src} alt={alt} {...props} />;
}
