import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../ui/button";
import { Check, FunnelIcon, Globe, Sliders, StarIcon, Tv } from "lucide-react";
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor,
} from "@/components/ui/combobox";
import ComboboxButton from "../providers/_components/ComboboxButton";
import SelectButton from "../providers/_components/SelectButton";
import { countries, countryMap, watchOptionMap } from "../providers/constants";
import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import { cn } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";

const COUNTRIES = [
  { code: "DE", name: "Deutschland 🇩🇪" },
  { code: "AT", name: "Österreich 🇦🇹" },
  { code: "CH", name: "Schweiz 🇨🇭" },
  { code: "US", name: "USA 🇺🇸" },
  { code: "GB", name: "Großbritannien 🇬🇧" },
];

const MOCK_PROVIDERS: Record<string, { id: number; name: string }[]> = {
  DE: [
    { id: 8, name: "Netflix" },
    { id: 9, name: "Amazon Prime" },
    { id: 337, name: "Disney+" },
  ],
  AT: [
    { id: 8, name: "Netflix" },
    { id: 9, name: "Amazon Prime" },
    { id: 150, name: "Sky X" },
  ],
};

type TypeValue = "all" | "movies" | "series";

export default function FilterButton({
  className,
  screen,
}: {
  className?: string;
  screen: "mobile" | "desktop";
}) {
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedProviders, setSelectedProviders] = useState<number[]>([]);
  const [selectedWatchOptions, setSelectedWatchOptions] = useState<string[]>(["flatrate"]);

  const [countrySearch, setCountrySearch] = useState("");
  const [providerSearch, setProviderSearch] = useState("");

  const activeProviders = selectedCountry ? MOCK_PROVIDERS[selectedCountry] || [] : [];

  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedContentType, setSelectedContentType] = useState<TypeValue>("all");
  const [selectedMinRating, setSelectedMinRating] = useState(0);
  const [selectedYearRange, setSelectedYearRange] = useState([1900, 2026]);

  const anchor = useComboboxAnchor();

  const genres = [
    "Action",
    "Comedy",
    "Documentary",
    "Drama",
    "Fantasy",
    "Horror",
    "Romance",
    "Sci-Fi",
    "Thriller",
  ] as const;

  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button variant="outline" className={className}>
            <FunnelIcon />
            {screen === "mobile" && "Filter"}
          </Button>
        }
      ></PopoverTrigger>
      <PopoverContent className="gap-5">
        <PopoverHeader>
          <PopoverTitle>Filter</PopoverTitle>
          <PopoverDescription>Description text here.</PopoverDescription>
        </PopoverHeader>

        <div className="flex flex-col gap-2">
          <p className="font-semibold">Genres</p>
          <Combobox
            multiple
            autoHighlight
            items={genres}
            value={selectedGenres}
            onValueChange={(value) => setSelectedGenres(value)}
          >
            <ComboboxChips ref={anchor} className="w-full max-w-xs">
              <ComboboxValue>
                {(values) => (
                  <>
                    {values.map((value: string) => (
                      <ComboboxChip key={value}>{value}</ComboboxChip>
                    ))}
                    <ComboboxChipsInput
                      placeholder={`${selectedGenres.length === 0 ? "Select a genre..." : ""}`}
                    />
                  </>
                )}
              </ComboboxValue>
            </ComboboxChips>
            <ComboboxContent anchor={anchor}>
              <ComboboxEmpty>No items found.</ComboboxEmpty>
              <ComboboxList>
                {(item) => (
                  <ComboboxItem key={item} value={item}>
                    {item}
                  </ComboboxItem>
                )}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
        </div>

        <div className="flex flex-col gap-2">
          <p className="font-semibold">Type</p>
          <Tabs
            className="mr-3"
            value={selectedContentType}
            onValueChange={(value) => setSelectedContentType(value)}
          >
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="movie">Movies</TabsTrigger>
              <TabsTrigger value="tv">Series</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="flex flex-col">
          <p className="font-semibold">Providers</p>

          <Accordion className="w-full">
            <AccordionItem value="region" className="border-b">
              <AccordionTrigger className="text-sm py-2 hover:no-underline">
                <span className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <span>Region</span>
                  {selectedCountry && (
                    <span className="text-xs font-bold text-primary">({selectedCountry})</span>
                  )}
                </span>
              </AccordionTrigger>
              <AccordionContent className="pt-2 pb-4 space-y-2">
                <Input
                  placeholder="Search country..."
                  value={countrySearch}
                  onChange={(e) => setCountrySearch(e.target.value)}
                  className="h-8 text-xs bg-background/50"
                />
                <ScrollArea className="h-28 pr-2">
                  <div className="space-y-1">
                    {COUNTRIES.filter((c) =>
                      c.name.toLowerCase().includes(countrySearch.toLowerCase()),
                    ).map((c) => (
                      <button
                        key={c.code}
                        onClick={() => {
                          setSelectedCountry(c.code);
                          setSelectedProviders([]);

                          setTimeout(() => {
                            document.getElementById("trigger-providers")?.click();
                          }, 100);
                        }}
                        className={cn(
                          "flex w-full items-center justify-between rounded-lg px-3 h-10 sm:h-9 text-sm sm:text-xs text-left transition-colors active:bg-accent/80",
                          selectedCountry === c.code
                            ? "bg-accent font-semibold text-accent-foreground"
                            : "hover:bg-accent/50",
                        )}
                      >
                        <span className="truncate">{c.name}</span>
                        {selectedCountry === c.code && (
                          <Check className="h-4 w-4 text-primary shrink-0 ml-2" />
                        )}
                      </button>
                    ))}
                  </div>
                </ScrollArea>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="providers" className="border-b" disabled={!selectedCountry}>
              <AccordionTrigger
                className={cn("text-sm py-2 hover:no-underline", !selectedCountry && "opacity-40")}
              >
                <span className="flex items-center gap-2">
                  <Tv className="h-4 w-4 text-muted-foreground" />
                  <span>Providers</span>
                </span>
              </AccordionTrigger>
              <AccordionContent className="pt-2 pb-4 space-y-2">
                <Input
                  placeholder="Search provider..."
                  value={providerSearch}
                  onChange={(e) => setProviderSearch(e.target.value)}
                  className="h-8 text-xs bg-background/50"
                />
                <ScrollArea className="h-32 pr-2">
                  <div className="space-y-1">
                    {activeProviders
                      .filter((p) => p.name.toLowerCase().includes(providerSearch.toLowerCase()))
                      .map((p) => {
                        const isSelected = selectedProviders.includes(p.id);
                        return (
                          <button
                            key={p.id}
                            onClick={() =>
                              setSelectedProviders((prev) =>
                                isSelected ? prev.filter((id) => id !== p.id) : [...prev, p.id],
                              )
                            }
                            className={cn(
                              "flex w-full items-center justify-between rounded-lg px-3 h-10 sm:h-9 text-sm sm:text-xs text-left transition-colors active:bg-accent/80",
                              isSelected ? "bg-accent/40 font-medium" : "hover:bg-accent/50",
                            )}
                          >
                            <span className="truncate">{p.name}</span>

                            {isSelected && <Check className="h-4 w-4 text-primary shrink-0 ml-2" />}
                          </button>
                        );
                      })}
                  </div>
                </ScrollArea>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="options" className="border-b-0">
              <AccordionTrigger className="text-sm py-2 hover:no-underline">
                <span className="flex items-center gap-2">
                  <Sliders className="h-4 w-4 text-muted-foreground" />
                  <span>Watch Options</span>
                </span>
              </AccordionTrigger>
              <AccordionContent className="pt-2 pb-2">
                <ToggleGroup
                  multiple
                  value={selectedWatchOptions}
                  onValueChange={(v) => v.length > 0 && setSelectedWatchOptions(v)}
                  className="gap-2 w-full"
                >
                  <ToggleGroupItem value="flatrate" variant="outline" className="flex-1 text-xs">
                    Stream
                  </ToggleGroupItem>
                  <ToggleGroupItem value="rent" variant="outline" className="flex-1 text-xs">
                    Rent
                  </ToggleGroupItem>
                  <ToggleGroupItem value="buy" variant="outline" className="flex-1 text-xs">
                    Buy
                  </ToggleGroupItem>
                </ToggleGroup>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <div className="flex flex-col gap-3">
          <p className="font-semibold flex gap-3 items-center">
            Min. Rating: <StarIcon />
            {selectedMinRating}
          </p>
          <Slider
            max={10}
            step={0.5}
            value={selectedMinRating}
            onValueChange={(value) => setSelectedMinRating(value as number)}
          />
        </div>

        <div className="flex flex-col gap-3">
          <p className="font-semibold">Release Year range: {selectedYearRange.join(" - ")}</p>
          <Slider
            className="mx-auto w-full max-w-xs"
            min={1900}
            max={2026}
            step={1}
            value={selectedYearRange}
            onValueChange={(value) => setSelectedYearRange(value as number[])}
          />
        </div>

        <div className="flex justify-between gap-4">
          <Button className="flex-1 rounded-lg">Apply</Button>
          <Button className="flex-1 rounded-lg" variant="secondary">
            Reset
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
