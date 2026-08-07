"use client";

import { useEffect, useState } from "react";
import posthog from "posthog-js";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Banner() {
  const [consentGiven, setConsentGiven] = useState("");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setConsentGiven(posthog.get_explicit_consent_status());
  }, []);

  const handleAcceptCookies = () => {
    posthog.opt_in_capturing();
    setConsentGiven("granted");
  };

  const handleDeclineCookies = () => {
    posthog.opt_out_capturing();
    setConsentGiven("denied");
  };

  return (
    <>
      {consentGiven === "pending" && (
        <Card className="fixed left-1/2 -translate-x-1/2 bottom-4 sm:right-4 sm:left-auto sm:translate-x-0 z-50 w-full max-w-sm sm:max-w-md shadow-2xl">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Cookie Preferences</CardTitle>
            <CardDescription className="flex flex-col gap-2 text-xs leading-relaxed text-muted-foreground">
              We use analytics cookies to understand how you use our product and improve your
              experience. These cookies are optional and are only used with your consent. You can
              change your preferences at any time.
              <Link
                href={"/privacy"}
                className="text-primary font-semibold text-sm hover:underline"
              >
                Privacy Policy
              </Link>
            </CardDescription>
          </CardHeader>

          <CardFooter className="flex justify-end gap-2">
            <Button onClick={handleAcceptCookies} className="px-5">
              Accept All
            </Button>
            <Button variant="outline" onClick={handleDeclineCookies}>
              Only Necessary
            </Button>
          </CardFooter>
        </Card>
      )}
    </>
  );
}
