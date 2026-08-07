"use client";

import Link from "next/link";
import posthog from "posthog-js";

export default function LegalLinks({
  flexRowOnLargeScreen = true,
}: {
  flexRowOnLargeScreen?: boolean;
}) {
  function resetCookies() {
    posthog.clear_opt_in_out_capturing();
    window.location.reload();
  }

  return (
    <div
      className={`flex flex-col ${flexRowOnLargeScreen && "lg:flex-row"} items-center mt-10 lg:mt-5 justify-between text-muted-foreground gap-y-4`}
    >
      <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-center">
        <Link href="/privacy" className="hover:text-accent-foreground transition-colors">
          Privacy policy
        </Link>
        <Link href="/tos" className="hover:text-accent-foreground transition-colors">
          Terms of Service
        </Link>
        <Link href="/impressum" className="hover:text-accent-foreground transition-colors">
          Legal Notice (Impressum)
        </Link>
        <Link
          href={`mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL}`}
          className="hover:text-accent-foreground transition-colors"
        >
          Contact Us
        </Link>

        <button
          onClick={resetCookies}
          className="cursor-pointer hover:text-accent-foreground transition-colors"
        >
          Cookie settings
        </button>
      </div>

      <p>©2026 NextWatch. All rights reserved</p>
    </div>
  );
}
