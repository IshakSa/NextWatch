import { Slider } from "@/components/ui/slider";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../../ui/accordion";
import { Input } from "../../../ui/input";
import { ScrollArea } from "../../../ui/scroll-area";
import { ToggleGroup, ToggleGroupItem } from "../../../ui/toggle-group";
import { cn, showInDevToast } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger } from "../../../ui/tabs";
import { Check, Globe, Sliders, StarIcon, Tv } from "lucide-react";
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
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  AVAILABLE_PROVIDERS,
  defaultFilterPayload,
  FilterPayload,
  genres,
  WatchOptions,
} from "../constants";
import { useFilter } from "@/components/carousel/DiscoverCarousel/_components/FilterContext";
import { COUNTRIES } from "@/components/providers/constants";
import ImageLoader from "@/components/shared/ImageLoader";

export default function FilterUi() {
  const {
    currentFilterPayload,
    setCurrentFilterPayload,
    activeFilterPayload,
    setActiveFilterPayload,
  } = useFilter();

  const [countrySearch, setCountrySearch] = useState("");
  const [providerSearch, setProviderSearch] = useState("");

  const anchor = useComboboxAnchor();

  const activeProviders = currentFilterPayload.country
    ? AVAILABLE_PROVIDERS[currentFilterPayload.country] || []
    : [];

  function resetFilter() {
    setCurrentFilterPayload(defaultFilterPayload);
    applyFilter(true);
  }

  function applyFilter(resetFilter?: boolean) {
    const newFilterPayload: FilterPayload = resetFilter
      ? defaultFilterPayload
      : {
          genres: currentFilterPayload.genres,
          contentType: currentFilterPayload.contentType,
          country: currentFilterPayload.country,
          providers: currentFilterPayload.providers,
          watchOptions: currentFilterPayload.watchOptions,
          minRating: currentFilterPayload.minRating,
          yearRange: currentFilterPayload.yearRange,
        };

    setActiveFilterPayload(newFilterPayload);
  }

  function updateCurrentPayloadField<K extends keyof FilterPayload>(
    key: K,
    newValue: FilterPayload[K],
  ) {
    setCurrentFilterPayload((previousFilterPayload) => {
      return {
        ...previousFilterPayload,
        [key]: newValue,
      };
    });
  }

  function isCurrentFilterPayloadChanged() {
    type FilterKey = keyof FilterPayload;
    const keysCurrent = Object.keys(currentFilterPayload) as FilterKey[];

    const isSame = keysCurrent.every(
      (key) => currentFilterPayload[key] === activeFilterPayload[key],
    );

    if (isSame) return false;
    return true;
  }

  function isDefaultChanged() {
    return currentFilterPayload !== defaultFilterPayload;
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <p className="font-semibold">Genres</p>
        <Combobox
          multiple
          autoHighlight
          items={genres}
          value={currentFilterPayload.genres}
          onValueChange={(newGenres) => updateCurrentPayloadField("genres", newGenres)}
        >
          <ComboboxChips ref={anchor} className="w-full">
            <ComboboxValue>
              {(values) => (
                <>
                  {values.map((value: string) => (
                    <ComboboxChip key={value} className="h-7">
                      {value}
                    </ComboboxChip>
                  ))}
                  <ComboboxChipsInput
                    placeholder={`${currentFilterPayload.genres.length === 0 ? "Select a genre..." : ""}`}
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
          value={currentFilterPayload.contentType}
          onValueChange={(newContentType) =>
            updateCurrentPayloadField("contentType", newContentType)
          }
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
                {currentFilterPayload.country && (
                  <span className="text-xs font-bold text-primary">
                    ({currentFilterPayload.country})
                  </span>
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
                  {COUNTRIES.filter((country) =>
                    country.name.toLowerCase().includes(countrySearch.toLowerCase()),
                  ).map((country) => (
                    <button
                      key={country.code}
                      onClick={() => {
                        updateCurrentPayloadField("country", country.code);
                        updateCurrentPayloadField("providers", []);

                        setTimeout(() => {
                          document.getElementById("trigger-providers")?.click();
                        }, 100);
                      }}
                      className={cn(
                        "flex w-full items-center justify-between rounded-lg px-3 h-10 sm:h-9 text-sm sm:text-xs text-left transition-colors active:bg-accent/80",
                        currentFilterPayload.country === country.code
                          ? "bg-accent font-semibold text-accent-foreground"
                          : "hover:bg-accent/50",
                      )}
                    >
                      <span className="truncate">{country.name}</span>
                      {currentFilterPayload.country === country.code && (
                        <Check className="h-4 w-4 text-primary shrink-0 ml-2" />
                      )}
                    </button>
                  ))}
                </div>
              </ScrollArea>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="providers"
            className="border-b"
            disabled={!currentFilterPayload.country}
          >
            <AccordionTrigger
              className={cn(
                "text-sm py-2 hover:no-underline",
                !currentFilterPayload.country && "opacity-40",
              )}
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
                    .filter((provider) =>
                      provider.providerName.toLowerCase().includes(providerSearch.toLowerCase()),
                    )
                    .map((provider) => {
                      const isSelected = currentFilterPayload.providers.includes(
                        provider.providerId,
                      );
                      return (
                        <button
                          key={provider.providerId}
                          onClick={() => {
                            const newProviders = isSelected
                              ? currentFilterPayload.providers.filter(
                                  (id) => id !== provider.providerId,
                                )
                              : [...currentFilterPayload.providers, provider.providerId];
                            updateCurrentPayloadField("providers", newProviders);
                          }}
                          className={cn(
                            "flex w-full items-center justify-between rounded-lg px-3 h-10 sm:h-9 text-sm sm:text-xs text-left transition-colors active:bg-accent/80",
                            isSelected ? "bg-accent/40 font-medium" : "hover:bg-accent/50",
                          )}
                        >
                          <div className="flex gap-2 items-center">
                            <div className="rounded-full overflow-hidden">
                              <ImageLoader
                                src={provider.logoPath}
                                alt="provider logo"
                                imageType="provider"
                                width={30}
                                height={30}
                              />
                            </div>
                            <span className="truncate">{provider.providerName}</span>
                          </div>

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
                value={currentFilterPayload.watchOptions}
                onValueChange={(newWatchOptions) =>
                  newWatchOptions.length > 0 &&
                  updateCurrentPayloadField("watchOptions", newWatchOptions as WatchOptions)
                }
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
        <div className="font-semibold flex gap-2 items-center">
          Min. Rating:
          <div className="flex items-center gap-1">
            <StarIcon size={15} fill="var(--star)" color="var(--star)" />
            {currentFilterPayload.minRating}
          </div>
        </div>
        <Slider
          max={10}
          step={0.5}
          value={[currentFilterPayload.minRating]}
          onValueChange={(newMinRating) =>
            updateCurrentPayloadField("minRating", newMinRating as number)
          }
        />
      </div>

      <div className="flex flex-col gap-3">
        <p className="font-semibold">Released: {currentFilterPayload.yearRange.join(" - ")}</p>
        <Slider
          className="mx-auto w-full"
          min={1970}
          max={new Date().getFullYear()}
          step={1}
          value={currentFilterPayload.yearRange}
          onValueChange={(newYearRange) =>
            updateCurrentPayloadField("yearRange", newYearRange as number[])
          }
        />
      </div>

      <div className="flex justify-between gap-4">
        <Button
          className="flex-1 rounded-lg"
          onClick={showInDevToast}
          disabled={!isCurrentFilterPayloadChanged()}
        >
          Apply
        </Button>
        <Button
          className="flex-1 rounded-lg"
          variant="secondary"
          onClick={resetFilter}
          disabled={!isDefaultChanged()}
        >
          Reset
        </Button>
      </div>
    </div>
  );
}
