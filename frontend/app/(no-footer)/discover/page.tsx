import DiscoverCarousel from "@/components/carousel/DiscoverCarousel/DiscoverCarousel";
import { ContentItem } from "@/types";

export default async function DiscoverPage() {
  const response = await fetch(`${process.env.BACKEND_URL}/api/content/top-rated/movie`);
  if (!response.ok) {
    throw new Error("couldn't fetch data");
  }
  const content: ContentItem[] = await response.json();

  return (
    <main className="mode-dark no-doc-scroll">
      <DiscoverCarousel content={content} />
    </main>
  );
}
