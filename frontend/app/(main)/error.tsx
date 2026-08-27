"use client";

import posthog from "posthog-js";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

export default function Error({
  error,
  reset,
}: Readonly<{
  error: Error & { digest?: string };
  reset: () => void;
}>) {
  useEffect(() => {
    posthog.captureException(error);
  }, [error]);

  return (
    <main className="flex h-screen flex-col items-center justify-center p-6 text-center space-y-6">
      <div className="rounded-full bg-destructive/10 p-3 text-destructive">
        <AlertCircle className="h-6 w-6" />
      </div>

      <div className="space-y-2 max-w-sm">
        <h1 className="text-2xl font-semibold">Something went wrong</h1>
        <p className="muted-text">
          An unexpected error occurred while processing your request. Please try again.
        </p>
      </div>

      <Button onClick={reset} variant="outline" className="h-10 px-4 min-w-30 rounded-lg">
        Try again
      </Button>
    </main>
  );
}
