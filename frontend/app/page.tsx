import ContentCarousel from "@/components/ContentCarousel/ContentCarousel";
import HeroContentCarousel from "@/components/hero/HeroContentCarousel";
import { movieData } from "@/lib/constants";

export default async function Home() {
  const content = movieData.slice(0, 5);
  return (
    <main>
      <HeroContentCarousel content={content} />

      <section className="container">
        <ContentCarousel carouselType="Poster" rowName="Just Release" />

        <ContentCarousel carouselType="Ranked" rowName="Popular" />

        <ContentCarousel carouselType="Backdrop" rowName="Movies" />
        <ContentCarousel carouselType="Backdrop" rowName="Series" />
      </section>
    </main>
  );
}
