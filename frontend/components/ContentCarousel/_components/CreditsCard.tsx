import { Actor, Director } from "@/lib/constants";
import Image from "next/image";

export default function CreditsCard({ person }: { person: Actor | Director }) {
  return (
    <div className="flex items-center space-x-3">
      <div className="relative w-15 h-15 overflow-hidden rounded-full">
        <Image
          src={`/images${person.profile_path}`}
          alt="person image"
          fill
          className="object-cover"
          priority
          unoptimized
        />
      </div>

      <div className="">
        <p className="font-semibold text-sm sm:text-base">{person.name}</p>
        {"character" in person && <p className="muted-text text-xs sm:text-sm">{person.character}</p>}
      </div>
    </div>
  );
}
