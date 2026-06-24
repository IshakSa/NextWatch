import ContentCarousel from "@/components/carousel/ContentCarousel/ContentCarousel";
import HeroContentCarousel from "@/components/hero/HeroContentCarousel";
import { movieData } from "@/lib/constants";

export default async function Home() {
  const content = movieData.slice(0, 5);
  return (
    <main>
      <section>
        <HeroContentCarousel content={content} />
      </section>

      <section className="container">
        <ContentCarousel
          carouselType="poster"
          rowName="Just Release"
          content={movieData}
        />

        <ContentCarousel
          carouselType="ranked"
          rowName="Popular"
          content={movieData}
        />

        <ContentCarousel
          carouselType="backdrop"
          rowName="Movies"
          content={movieData}
        />
        <ContentCarousel
          carouselType="backdrop"
          rowName="Series"
          content={movieData}
        />
      </section>
    </main>
  );
}
