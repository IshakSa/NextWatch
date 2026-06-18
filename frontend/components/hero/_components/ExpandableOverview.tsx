"use client";

import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useState } from "react";

export default function ReadMoreButton({ text }: { text: string }) {
  const isDesktop = useMediaQuery("(min-width: 1280px)");
  const [isExpanded, setIsExpanded] = useState(false);

  function handleExpand() {
    if (isExpanded) {
      setIsExpanded(false);
    } else {
      setIsExpanded(true);
    }
  }

  const MAX_LENGTH = isDesktop ? 170 : 100;
  const shouldTruncate = text.length > MAX_LENGTH;
  const shouldDisplayButton = text.length < MAX_LENGTH ? false : true;

  return (
    <p className="max-w-screen sm:max-w-2/3 lg:max-w-2/5">
      {isExpanded ? text : text.slice(0, MAX_LENGTH)}
      {shouldTruncate && (
        <>
          {!isExpanded && "..."}
          <span> </span>
          {shouldDisplayButton && (
            <button
              type="button"
              className="text-primary cursor-pointer"
              onClick={handleExpand}
            >
              {isExpanded ? "Show less" : "Show more"}
            </button>
          )}
        </>
      )}
    </p>
  );
}
