import DiscoverCarousel from "@/components/carousel/DiscoverCarousel/DiscoverCarousel";
import { ContentItem } from "@/types";
import { request } from "@/lib/requestHandler";

export default async function DiscoverPage() {
  const content: ContentItem[] = await request(
    "/api/user/recommendations?limit=30",
    "couldn't fetch data",
  );

  return (
    <main className="mode-dark no-doc-scroll">
      <DiscoverCarousel content={content} />
    </main>
  );
}
