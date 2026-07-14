import ContentCarousel from "@/components/carousel/ContentCarousel";
import HeroContentCarousel from "@/components/hero/HeroContentCarousel";
import {ContentItem} from "@/types/content";

async function getUpcoming() {
  const response = await fetch(`${process.env.BACKEND_URL}/api/content/upcoming`);
  if (!response.ok) {
    throw new Error("failed to fetch data");
  }

  return await response.json();
}

async function getHero() {
  const response = await fetch(
    `${process.env.BACKEND_URL}/api/content/trending/day?includeTrailer=true`,
  );
  if (!response.ok) {
    throw new Error("failed to fetch data");
  }

  return await response.json();
}

async function getRanked() {
  const response = await fetch(`${process.env.BACKEND_URL}/api/content/trending/week`);
  if (!response.ok) {
    throw new Error("failed to fetch data");
  }

  return await response.json();
}

async function getMovies() {
  const response = await fetch(`${process.env.BACKEND_URL}/api/content/top-rated/movie`);
  if (!response.ok) {
    throw new Error("failed to fetch data");
  }

  return await response.json();
}

async function getSeries() {
  const response = await fetch(`${process.env.BACKEND_URL}/api/content/top-rated/tv`);
  if (!response.ok) {
    throw new Error("failed to fetch data");
  }

  return await response.json();
}

export default async function Home() {
  const upcomingDate = getUpcoming();
  const heroData = getHero();
  const rankedData = getRanked();
  const moviesData = getMovies();
  const seriesData = getSeries();

  const [upcoming, hero, ranked, movies, series]: ContentItem[][] = await Promise.all([
    upcomingDate,
    heroData,
    rankedData,
    moviesData,
    seriesData,
  ]);

  return (
    <main>
      <section>
        <HeroContentCarousel content={hero}/>
      </section>

      <section className="container">
        <ContentCarousel carouselType="poster" carouselTitle="Upcoming releases"
                         content={upcoming}/>

        <ContentCarousel carouselType="ranked" carouselTitle="Popular this week" content={ranked}/>

        <ContentCarousel carouselType="backdrop" carouselTitle="Top-rated movies" content={movies}/>
        <ContentCarousel carouselType="backdrop" carouselTitle="Top-rated shows" content={series}/>
      </section>
    </main>
  );
}
