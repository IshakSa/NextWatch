import ImageLoader from "@/components/shared/ImageLoader";
import { ImageSizes } from "@/lib/constants";

export default function HeroImage({ image }: { image: string }) {
  return (
    <>
      <ImageLoader
        src={image}
        alt="poster"
        apiWidth={ImageSizes.hero}
        fill
        preload
        className="object-cover object-center"
      />

      <div className="dark absolute top-0 left-0 right-0 h-1/4 bg-linear-to-b from-background to-transparent opacity-50" />
      <div className="absolute bottom-0 left-0 right-0 h-51/100 bg-linear-to-t from-background to-transparent" />
    </>
  );
}
