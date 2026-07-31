import DiscoverCarousel from "@/components/carousel/DiscoverCarousel/DiscoverCarousel";
import { request } from "@/lib/requestHandler";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ClapperboardIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function DiscoverPage() {
  const hasRecommendations: boolean = await request(
    "/api/user/has-embedding-profile",
    "couldn't fetch data",
  );

  if (!hasRecommendations) {
    return (
      <main className="flex min-h-screen items-center justify-center p-4 bg-background">
        <Card className="max-w-md w-full bg-card/50">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <ClapperboardIcon className="h-6 w-6" />
            </div>

            <CardTitle className="text-xl font-bold tracking-tight sm:text-2xl">
              Let’s find your next favorite title
            </CardTitle>

            <CardDescription className="text-sm text-muted-foreground pt-2 leading-relaxed">
              Add a movie or series to your watchlist, or mark one as watched, to help us understand
              what you like to watch.
            </CardDescription>
          </CardHeader>

          <CardContent />

          <CardFooter className="flex flex-col sm:flex-row gap-2 w-full">
            <Link className="w-full" href="/">
              <Button className="w-full" size="lg">
                Browse Movies & Shows
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </main>
    );
  }

  return (
    <main className="mode-dark no-doc-scroll">
      <DiscoverCarousel />
    </main>
  );
}
