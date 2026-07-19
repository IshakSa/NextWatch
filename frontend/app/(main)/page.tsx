import ContentCarousel from "@/components/carousel/ContentCarousel";
import HeroContentCarousel from "@/components/hero/HeroContentCarousel";
import { ContentItem } from "@/types/content";
import { WatchlistStatus } from "@/types";
import { request } from "@/lib/requestHandler";
import { cookies } from "next/headers";

async function getWatchlistStatus(contentId: number) {
  return await request(`/api/watchlist/status/${contentId}`, "failed to fetch data");
}

export default async function Home() {
  const isLoggedIn = (await cookies()).has("auth_token");

  const upcomingDate = await request("/api/content/upcoming", "failed to fetch data");
  const heroData = await request(
    "/api/content/trending/day?includeTrailer=true",
    "failed to fetch data",
  );
  const rankedData = await request("/api/content/trending/week", "failed to fetch data");
  const moviesData = await request("/api/content/top-rated/movie", "failed to fetch data");
  const seriesData = await request("/api/content/top-rated/tv", "failed to fetch data");

  const [upcoming, hero, ranked, movies, series]: ContentItem[][] = await Promise.all([
    upcomingDate,
    heroData,
    rankedData,
    moviesData,
    seriesData,
  ]);

  const watchlistStatuses = await Promise.all(
    hero.map(async (contentItem) => {
      const watchlistStatus: WatchlistStatus = isLoggedIn
        ? await getWatchlistStatus(contentItem.id)
        : "none";
      return { contentId: contentItem.id, status: watchlistStatus };
    }),
  );

  return (
    <main>
      <section>
        <HeroContentCarousel
          content={hero}
          watchlistStatuses={watchlistStatuses}
          isLoggedIn={isLoggedIn}
        />
      </section>

      <section className="container">
        <ContentCarousel
          carouselType="poster"
          carouselTitle="Upcoming releases"
          content={upcoming}
        />

        <ContentCarousel carouselType="ranked" carouselTitle="Popular this week" content={ranked} />

        <ContentCarousel
          carouselType="backdrop"
          carouselTitle="Top-rated movies"
          content={movies}
        />
        <ContentCarousel carouselType="backdrop" carouselTitle="Top-rated shows" content={series} />
      </section>
    </main>
  );
}
