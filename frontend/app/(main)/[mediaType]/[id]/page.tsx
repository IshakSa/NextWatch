import EpisodesCarousel from "@/components/carousel/EpisodesCarousel/EpisodeCarousel";
import ExpandableOverview from "@/components/shared/ExpandableOverview";
import HeroSection from "@/components/hero/HeroSection";
import WatchProviders from "@/components/providers/WatchProviders";
import { ContentItemDetails, ContentType, WatchlistStatus } from "@/types";
import ContentCarousel from "@/components/carousel/ContentCarousel";
import { request } from "@/lib/requestHandler";
import { cookies } from "next/headers";

async function getDetails(mediaType: "tv" | "movie", id: number) {
  return await request(
    `/api/content/${mediaType}/${id}?includeSimilar=true`,
    "failed to fetch data",
  );
}

async function getWatchlistStatus(contentId: number, contentType: ContentType) {
  return await request(`/api/watchlist/${contentType}/${contentId}/status`, "failed to fetch data");
}

export default async function MovieDetailsPage({
  params,
}: {
  params: Promise<{ mediaType: "movie" | "tv"; id: string }>;
}) {
  const isLoggedIn = (await cookies()).has("auth_token");
  const { mediaType, id } = await params;
  const idNum = Number(id);

  const contentItem: ContentItemDetails = await getDetails(mediaType, idNum);
  const watchlistStatus: WatchlistStatus = isLoggedIn
    ? await getWatchlistStatus(contentItem.id, contentItem.type)
    : "none";

  if (!contentItem) {
    return;
  }

  return (
    <main>
      <section>
        <HeroSection
          contentItem={contentItem}
          page="details"
          size={60}
          watchlistStatus={watchlistStatus}
          isLoggedIn={isLoggedIn}
        />
      </section>

      <section className="container mt-10 sm:mt-15">
        <div>
          <h2 className="mb-2">Story Line</h2>

          <div className="text-foreground/60">
            <ExpandableOverview text={contentItem.overview} page="details" />
          </div>
        </div>

        <ContentCarousel
          carouselType="credits"
          carouselTitle="Top Cast"
          content={contentItem.credits.cast}
          margin="mt-20"
        />

        {contentItem.credits.directors.length > 0 && (
          <ContentCarousel
            carouselType="credits"
            carouselTitle={`${mediaType === "movie" ? "Director" : "Creator"}`}
            content={contentItem.credits.directors}
            margin="mt-20"
          />
        )}

        {contentItem.type === "tv" && contentItem.seasons && (
          <EpisodesCarousel seasons={contentItem.seasons} margin="mt-20" />
        )}

        <WatchProviders providers={contentItem.providers} />
      </section>

      <div className="border-t-2 mt-15" />

      {contentItem.similar && (
        <section className="container">
          <ContentCarousel
            carouselType="backdrop"
            carouselTitle={`Similar ${contentItem.type === "movie" ? "movies" : "shows"} for you`}
            content={contentItem.similar}
            margin="mt-15"
          />
        </section>
      )}
    </main>
  );
}
