"use client";

import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useState } from "react";

export default function ExpandableOverview({
  text,
  page,
}: {
  text: string;
  page: "home" | "details" | "episodes" | "discover";
}) {
  const isDesktop = useMediaQuery("(min-width: 1280px)");
  const [isExpanded, setIsExpanded] = useState(false);

  function handleExpand() {
    if (isExpanded) {
      setIsExpanded(false);
    } else {
      setIsExpanded(true);
    }
  }

  function getMaxWidthClass() {
    if (page === "home") return "sm:max-w-2/3 lg:max-w-2/5";
    if (page === "details") return "lg:max-w-2/3";
    if (page === "discover") return "";
    return "";
  }

  let MAX_LENGTH = 100;
  if (page === "details") {
    MAX_LENGTH = isDesktop ? 400 : 200;
  } else if (page === "episodes") {
    MAX_LENGTH = isDesktop ? 75 : 60;
  } else if (isDesktop) {
    MAX_LENGTH = 170;
  }

  const shouldTruncate = text.length > MAX_LENGTH;
  const shouldDisplayButton = text.length < MAX_LENGTH ? false : true;

  return (
    <div className={`max-w-screen ${getMaxWidthClass()}`}>
      {isExpanded ? text : text.slice(0, MAX_LENGTH)}
      {shouldTruncate && (
        <>
          {!isExpanded && "..."}
          <span> </span>
          {shouldDisplayButton && (
            <button type="button" className="text-primary cursor-pointer" onClick={handleExpand}>
              {isExpanded ? "Show less" : "Show more"}
            </button>
          )}
        </>
      )}
    </div>
  );
}
