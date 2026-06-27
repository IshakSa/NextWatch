import ContentCarousel from "@/components/carousel/ContentCarousel/ContentCarousel";
import EpisodesCarousel from "@/components/carousel/EpisodesCarousel/EpisodeCarousel";
import ExpandableOverview from "@/components/shared/ExpandableOverview";
import HeroSection from "@/components/hero/HeroSection";
import WatchProviders from "@/components/providers/WatchProviders";
import { ContentItemDetails } from "@/types";

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

  const movie: ContentItemDetails = await getDetails(mediaType, idNum);

  if (!movie) {
    return;
  }

  return (
    <main>
      <section>
        <HeroSection contentItem={movie} page="details" size={60} />
      </section>

      <section className="container mt-10 sm:mt-15">
        <div>
          <h2 className="mb-2">Story Line</h2>

          <div className="text-foreground/60">
            <ExpandableOverview text={movie.overview} page="details" />
          </div>
        </div>

        <ContentCarousel
          carouselType="credits"
          rowName="Top Cast"
          content={movie.credits.cast}
          margin="mt-20"
        />

        <ContentCarousel
          carouselType="credits"
          rowName="Director"
          content={movie.credits.directors}
          margin="mt-20"
        />

        {movie.type === "tv" && movie.seasons && (
          <EpisodesCarousel seasons={movie.seasons} margin="mt-20" />
        )}

        <WatchProviders providers={movie.providers} />
      </section>

      <div className="border-t-2 mt-15" />

      {movie.similar && (
        <section className="container">
          <ContentCarousel<"backdrop">
            carouselType="backdrop"
            rowName="Similar Movies for you"
            content={movie.similar}
            margin="mt-15"
          />
        </section>
      )}
    </main>
  );
}
