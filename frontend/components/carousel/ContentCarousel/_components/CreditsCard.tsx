import ImageLoader from "@/components/shared/ImageLoader";
import { ImageSizes } from "@/lib/constants";
import { Actor, Director } from "@/types";

export default function CreditsCard({ person }: { person: Actor | Director }) {
  return (
    <div className="flex items-center space-x-3">
      <div className="relative w-15 h-15 overflow-hidden rounded-full">
        <ImageLoader
          src={person.profilePath}
          alt="person image"
          apiWidth={ImageSizes.credits}
          fill
          className="object-cover"
        />
      </div>

      <div className="">
        <p className="font-semibold text-sm sm:text-base">{person.name}</p>
        {"character" in person && (
          <p className="muted-text text-xs sm:text-sm">{person.character}</p>
        )}
      </div>
    </div>
  );
}
