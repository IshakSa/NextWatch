"use client";

import { Button } from "@/components/ui/button";
import { PlayIcon } from "lucide-react";

export default function TrailerButton({
  className,
}: {
  className?: string;
}) {
  return (
    <Button className={className}>
      <PlayIcon />
      <p>Watch Trailer</p>
    </Button>
  );
}
