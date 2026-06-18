import ContentCarousel from "@/components/ContentCarousel/ContentCarousel";
import HeroSection from "@/components/hero/HeroSection";

import { movieData } from "@/lib/constants";

const data = movieData[0];

export default async function Home() {
  return (
    <main>
      <HeroSection data={data} />

      <section className="container">
        <ContentCarousel carouselType="Poster" rowName="Just Release" />

        <ContentCarousel carouselType="Ranked" rowName="Popular" />

        <ContentCarousel carouselType="Backdrop" rowName="Movies" />
        <ContentCarousel carouselType="Backdrop" rowName="Series" />
      </section>
    </main>
  );
}
