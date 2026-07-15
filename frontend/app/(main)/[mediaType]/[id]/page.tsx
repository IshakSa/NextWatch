import EpisodesCarousel from "@/components/carousel/EpisodesCarousel/EpisodeCarousel";
import ExpandableOverview from "@/components/shared/ExpandableOverview";
import HeroSection from "@/components/hero/HeroSection";
import WatchProviders from "@/components/providers/WatchProviders";
import { ContentItemDetails } from "@/types";
import ContentCarousel from "@/components/carousel/ContentCarousel";

async function getDetails(mediaType: "tv" | "movie", id: number) {
  const response = await fetch(
    `${process.env.BACKEND_URL}/api/content/${mediaType}/${id}?includeSimilar=true`,
  );
  if (!response.ok) {
    throw new Error("failed to fetch data");
  }

  return await response.json();
}

export default async function MovieDetailsPage({
  params,
}: {
  params: Promise<{ mediaType: "movie" | "tv"; id: string }>;
}) {
  const { mediaType, id } = await params;
  const idNum = Number(id);

  const contentItem: ContentItemDetails = await getDetails(mediaType, idNum);

  if (!contentItem) {
    return;
  }

  return (
    <main>
      <section>
        <HeroSection contentItem={contentItem} page="details" size={60} />
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
          <ContentCarousel<"backdrop">
            carouselType="backdrop"
            carouselTitle="Similar Movies for you"
            content={contentItem.similar}
            margin="mt-15"
          />
        </section>
      )}
    </main>
  );
}
