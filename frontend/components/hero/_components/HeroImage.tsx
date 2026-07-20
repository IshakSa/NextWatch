import ImageLoader from "@/components/shared/ImageLoader";
import Link from "next/link";
import { ContentItem } from "@/types";

function HeroContent({ contentItem }: { contentItem: ContentItem }) {
  return (
    <>
      <ImageLoader
        src={contentItem.backdropPath}
        alt="hero"
        imageType="hero"
        fill
        preload
        className="object-cover object-center"
      />

      <div className="dark absolute top-0 left-0 right-0 h-1/4 bg-linear-to-b from-background to-transparent opacity-50" />
      <div className="absolute bottom-0 left-0 right-0 h-51/100 bg-linear-to-t from-background to-transparent" />
    </>
  );
}

export default function HeroImage({
  contentItem,
  clickable,
}: {
  contentItem: ContentItem;
  clickable: boolean;
}) {
  return clickable ? (
    <Link href={`/${contentItem.type}/${contentItem.id}`}>
      <HeroContent contentItem={contentItem} />
    </Link>
  ) : (
    <HeroContent contentItem={contentItem} />
  );
}
