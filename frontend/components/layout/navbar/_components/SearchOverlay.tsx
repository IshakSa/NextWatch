import PosterContentCard from "@/components/carousel/ContentCarousel/_components/PosterContentCard";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { useDebounce } from "@/hooks/useDebounce";
import { SearchIcon, XIcon } from "lucide-react";
import { ChangeEvent, useEffect, useState } from "react";
import { searchContent } from "./actions";
import { ContentItem } from "@/types";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export default function SearchOverlay({
  handleSearchOverlay,
}: {
  handleSearchOverlay: () => void;
}) {
  const [searchbarValue, setSearchbarValue] = useState("");
  const currentSearch = useDebounce(searchbarValue, 300);
  const [contentResults, setContentResults] = useState<ContentItem[] | []>([]);
  const isDesktop = useMediaQuery("(min-width: 1280px)");

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const content: ContentItem[] = await searchContent(currentSearch);
        setContentResults(content);
      } catch (error) {}
    };
    fetchContent();
  }, [currentSearch]);

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    setSearchbarValue(event.target.value);
  }

  return (
    <div className="no-doc-scroll fixed inset-0 z-1000 w-screen h-full flex flex-col items-center justify-start bg-zinc-950/70 backdrop-blur-md">
      <div className="container relative max-w-4xl flex flex-col gap-10 mt-20">
        <div className="absolute right-0 -top-10 mx-5">
          <Button variant="secondary" className="rounded-lg" onClick={handleSearchOverlay}>
            <XIcon />
          </Button>
        </div>

        <div className="flex flex-col text-center items-center gap-3">
          <h1 className="text-4xl">Find exactly what you need</h1>
          <p className="text-foreground/70 max-w-xl">
            Explore thousands of movies and series. Just type a title to start
            your search and discover everything you need to know in a single
            click.
          </p>
        </div>

        <InputGroup className="px-3 py-7 rounded-3xl">
          <InputGroupInput
            value={searchbarValue}
            onChange={handleInputChange}
            placeholder="Search for anything..."
          />
          <InputGroupAddon>
            <SearchIcon />
          </InputGroupAddon>
        </InputGroup>
      </div>

      <div className="container grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mt-10 mb-10 overflow-y-auto mask-[linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] scrollbar-none [&::-webkit-scrollbar]:hidden">
        {currentSearch.trim() && contentResults.length === 0 && (
          <h2>No results found</h2>
        )}

        {contentResults.map((contentItem, index) => (
          <div
            key={index}
            onClick={handleSearchOverlay}
            className="cursor-pointer"
          >
            <PosterContentCard
              contentItem={contentItem}
              genreAmount={isDesktop ? 2 : 1}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
