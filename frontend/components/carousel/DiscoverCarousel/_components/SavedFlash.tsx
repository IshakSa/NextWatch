import { BookmarkIcon } from "lucide-react";

export default function SavedFlash() {
  return (
    <div className="absolute inset-0 z-100 flex items-center justify-center pointer-events-none">
      <div className="animate-ping-fade-up flex flex-col items-center justify-center p-6 rounded-3xl bg-zinc-950/40 backdrop-blur-sm border border-white/10 shadow-2xl">
        <BookmarkIcon size={64} className="text-primary" fill="currentColor" />
        <span className="text-white text-sm font-semibold mt-2 tracking-wide drop-shadow-md">
          Saved
        </span>
      </div>
    </div>
  );
}
