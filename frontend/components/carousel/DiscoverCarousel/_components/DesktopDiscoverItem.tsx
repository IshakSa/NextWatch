import { ChildRefActions } from "@/components/actions/AddWatchlistButton";
import { CarouselItem } from "@/components/ui/carousel";
import { ContentItem } from "@/types";
import SavedFlash from "./SavedFlash";
import ImageLoader from "@/components/shared/ImageLoader";
import DiscoverEmbeddedVideo from "@/components/shared/DiscoverEmbeddedVideo";
import DiscoverDetails from "./DiscoverDetails";
import DiscoverActions from "./DiscoverActions";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export default function DesktopDiscoverItem({
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

        <div className="absolute inset-0 z-0 bg-zinc-950/70 backdrop-blur-md pointer-events-none h-screen" />

        <div className="absolute top-1/2 -translate-y-1/2 z-50 gap-5 flex items-center w-full h-full ">
          <div className="flex-1 h-full flex items-center">
            <DiscoverEmbeddedVideo
              youtubeId={item.trailerId}
              showVideo={isVideoShown}
              videoSizes="max-w-9/10 2xl:max-w-8/10"
              justify="justify-end"
            />
          </div>

          <div className="w-full mr-10 xl:mr-15 2xl:mr-30 max-w-xs xl:max-w-sm shrink-0 flex flex-col gap-10 rounded-2xl bg-zinc-900/50 backdrop-blur-xl border border-border p-6 shadow-2xl">
            <DiscoverDetails item={item} isHighScreen={isHighScreen} />
            <DiscoverActions onRegisterRef={onRegisterRef} screen="desktop" />
          </div>
        </div>
      </>
    </CarouselItem>
  );
}
