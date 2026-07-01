import { StarIcon } from "lucide-react";

export default function InfoOverlay({
  contentTitle,
  rating,
  genres,
  extras,
}: {
  contentTitle: string;
  rating: number;
  genres?: string[];
  extras?: string[];
}) {
  return (
    <>
      <p className="truncate font-semibold text-lg mb-1">{contentTitle}</p>
      <div className="flex items-center text-sm">
        <StarIcon size={20} color="#eab308" fill="#eab308" />
        <p className="mx-1 font-semibold">{rating}</p>
        {genres && <p className="muted-text"> | {genres.join(" • ")}</p>}
        {extras && <p className="muted-text"> | {extras.join(" • ")}</p>}
      </div>
    </>
  );
}
