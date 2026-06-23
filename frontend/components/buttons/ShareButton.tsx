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
      title: "Mein Next.js Projekt",
      text: "Schau dir diese tolle Seite an!",
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.error("Fehler beim Teilen:", err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("In Zwischenablage kopieren fehlgeschlagen", err);
      }
    }
  };

  return (
    <div>
      <Button
        variant={copied ? "secondary" : "outline"}
        onClick={handleShare}
        className={className}
        size={"icon"}
      >
        <div className="flex space-x-2 items-center">
          <ShareIcon />
          {isDesktop && <p>{copied ? "Link Copied" : "Share"}</p>}
        </div>
      </Button>
    </div>
  );
}
