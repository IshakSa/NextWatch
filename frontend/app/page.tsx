import ContentCarousel from "@/components/carousel/ContentCarousel/ContentCarousel";
import HeroContentCarousel from "@/components/hero/HeroContentCarousel";
import { ContentItem } from "@/lib/constants";

async function getLatest() {
  const response = await fetch(`${process.env.BACKEND_URL}/api/content/latest`);
  if (!response.ok) {
    throw new Error("failed to fetch data");
  }

  return await response.json();
}

async function getHero() {
  const response = await fetch(
    `${process.env.BACKEND_URL}/api/content/trending/day`,
  );
  if (!response.ok) {
    throw new Error("failed to fetch data");
  }

  return await response.json();
}

async function getRanked() {
  const response = await fetch(
    `${process.env.BACKEND_URL}/api/content/trending/week`,
  );
  if (!response.ok) {
    throw new Error("failed to fetch data");
  }

  return await response.json();
}

async function getMovies() {
  const response = await fetch(
    `${process.env.BACKEND_URL}/api/content/movie/top-rated`,
  );
  if (!response.ok) {
    throw new Error("failed to fetch data");
  }

  return await response.json();
}

async function getSeries() {
  const response = await fetch(
    `${process.env.BACKEND_URL}/api/content/tv/top-rated`,
  );
  if (!response.ok) {
    throw new Error("failed to fetch data");
  }

  return await response.json();
}

export default async function Home() {
  const latestData = getLatest();
  const heroData = getHero();
  const rankedData = getRanked();
  const moviesData = getMovies();
  const seriesData = getSeries();

  const [latest, hero, ranked, movies, series]: ContentItem[][] =
    await Promise.all([
      latestData,
      heroData,
      rankedData,
      moviesData,
      seriesData,
    ]);

  return (
    <main>
      <section>
        <HeroContentCarousel content={hero} />
      </section>

      <section className="container">
        <ContentCarousel
          carouselType="poster"
          rowName="Just Release"
          content={latest}
        />

        <ContentCarousel
          carouselType="ranked"
          rowName="Popular"
          content={ranked}
        />

        <ContentCarousel
          carouselType="backdrop"
          rowName="Movies"
          content={movies}
        />
        <ContentCarousel
          carouselType="backdrop"
          rowName="Series"
          content={series}
        />
      </section>
    </main>
  );
}
