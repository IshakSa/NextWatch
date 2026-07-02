"use client";

import { ShareIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export default function ShareButton({ className }: { className?: string }) {
  const [copied, setCopied] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 640px)");

  const handleShare = async () => {
    const shareData = {
      title: "Check out this recommendation!",
      text: "Found this amazing title on this movie platform.",
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {}
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {}
    }
  };

  return (
    <div>
      <Button variant={"outline"} onClick={handleShare} className={className} size={"icon"}>
        <div className="flex space-x-2 items-center">
          <ShareIcon />
          {isDesktop && <p>{copied ? "Link Copied!" : "Share"}</p>}
        </div>
      </Button>
    </div>
  );
}
