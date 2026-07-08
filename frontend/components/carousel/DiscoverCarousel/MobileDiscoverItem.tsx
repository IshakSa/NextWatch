import { ChildRefActions } from "@/components/actions/AddWatchlistButton";
import { CarouselItem } from "@/components/ui/carousel";
import { ContentItem } from "@/types";
import SavedFlash from "./SavedFlash";
import ImageLoader from "@/components/shared/ImageLoader";
import DiscoverEmbeddedVideo from "@/components/shared/DiscoverEmbeddedVideo";
import DiscoverDetails from "./DiscoverDetails";
import DiscoverActions from "./DiscoverActions";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export default function MobileDiscoverItem({
  item,
  imagePath,
  imageSize,
  animatingSlideIndex,
  index,
  onRegisterRef,
  isVideoShown,
}: {
  item: ContentItem;
  imagePath: string;
  imageSize: number;
  animatingSlideIndex: number | null;
  index: number;
  onRegisterRef: (currentButton: ChildRefActions) => void;
  isVideoShown: boolean;
}) {
  const isHighScreen = useMediaQuery("(min-height: 768px)");

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
        <div className="absolute z-1 w-screen bottom-0 h-screen bg-zinc-950/70 backdrop-blur-md" />

        <div className={`absolute ${isHighScreen ? "bottom-20" : "bottom-15"} z-100 left-4`}>
          <DiscoverDetails item={item} isHighScreen={isHighScreen} />
        </div>

        <div className={`absolute right-4 ${isHighScreen ? "bottom-30" : "bottom-15"} z-50`}>
          <DiscoverActions onRegisterRef={onRegisterRef} screen="mobile" />
        </div>
      </>
    </CarouselItem>
  );
}
