"use client";

import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useState } from "react";

export default function ExpandableOverview({
  text,
  overviewType = "home",
}: {
  text: string;
  overviewType?: "home" | "details";
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

  let MAX_LENGTH = 100;
  if (overviewType === "details") {
    MAX_LENGTH = isDesktop ? 400 : 200;
  } else if (isDesktop) {
    MAX_LENGTH = 170;
  }

  const shouldTruncate = text.length > MAX_LENGTH;
  const shouldDisplayButton = text.length < MAX_LENGTH ? false : true;

  return (
    <p
      className={`max-w-screen sm:max-w-2/3  ${overviewType === "details" ? "lg:max-w-2/3" : "lg:max-w-2/5"} whitespace-pre-wrap wrap-break-word`}
    >
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
