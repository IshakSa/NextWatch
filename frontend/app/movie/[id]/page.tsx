import ContentCarousel from "@/components/ContentCarousel/ContentCarousel";
import ExpandableOverview from "@/components/hero/_components/ExpandableOverview";
import HeroSection from "@/components/hero/HeroSection";
import Providers from "@/components/Providers";
import { credits, movieData, providers } from "@/lib/constants";

export default async function MovieDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const idNum = Number(id);

  const movie = movieData.find((movie) => movie.id === idNum);

  if (!movie) {
    return;
  }

  return (
    <main>
      <section>
        <HeroSection contentItem={movie} type="details" size={60} />
      </section>

      <section className="container mt-5 sm:mt-15">
        <div>
          <h2 className="mb-2">Story Line</h2>

          <div className="text-foreground/60">
            <ExpandableOverview text={movie.overview} overviewType="details" />
          </div>
        </div>

        <ContentCarousel
          carouselType="credits"
          rowName="Top Cast"
          content={credits.cast}
        />

        <ContentCarousel
          carouselType="credits"
          rowName="Director"
          content={credits.director}
        />

        <Providers providers={providers} />
      </section>

      <section className="container">
        <ContentCarousel<"backdrop">
          carouselType="backdrop"
          rowName="Similar Movies for you"
          content={movieData}
        />
      </section>
    </main>
  );
}
