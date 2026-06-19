import ContentCarousel from "@/components/ContentCarousel/ContentCarousel";
import HeroContentCarousel from "@/components/hero/HeroContentCarousel";
import { movieData } from "@/lib/constants";

export default async function Home() {
  const content = movieData.slice(0, 5);
  return (
    <main>
      <HeroContentCarousel content={content} />

      <section className="container">
        <ContentCarousel carouselType="poster" rowName="Just Release" />

        <ContentCarousel carouselType="ranked" rowName="Popular" />

        <ContentCarousel carouselType="backdrop" rowName="Movies" />
        <ContentCarousel carouselType="backdrop" rowName="Series" />
      </section>
    </main>
  );
}
