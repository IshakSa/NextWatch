"use client";

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { ProviderOptions } from "@/lib/constants";
import { useEffect, useState } from "react";

const countries = [
  "United States",
  "United Kingdom",
  "Germany",
  "France",
  "Italy",
  "Spain",
  "Portugal",
  "Switzerland",
  "Austria",
  "Denmark",
  "Sweden",
];

const countryMap: CountryObject = {
  "United States": "US",
  "United Kingdom": "GB",
  Germany: "DE",
  France: "FR",
  Italy: "IT",
  Spain: "ES",
  Portugal: "PT",
  Switzerland: "CH",
  Austria: "AT",
  Denmark: "DK",
  Sweden: "SE",
};

const watchOptionMap: WatchOptionMap = {
  Stream: "flatrate",
  Buy: "buy",
  Rent: "rent",
};

interface WatchOptionMap {
  [watchOption: string]: string;
}

interface CountryObject {
  [countryCode: string]: string;
}

export default function Providers({
  providers,
}: {
  providers: ProviderOptions;
}) {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(
    countries[0] || null,
  );
  const [countryProviders, setCountryProviders] = useState(
    selectedCountry ? providers[countryMap[selectedCountry]] : null,
  );
  const [selectedWatchOption, setSelectedWatchOption] = useState("Stream");

  useEffect(() => {
    if (!selectedCountry) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCountryProviders(null);
      return;
    }

    const currentProviders = providers[countryMap[selectedCountry]];
    setCountryProviders(currentProviders);
  }, [selectedCountry, providers]);

  function handleCountryChange(value: string | null) {
    setSelectedCountry(value);
  }

  function handleWatchOptionChange(value: string | null) {
    if (value) {
      setSelectedWatchOption(value);
    }
  }

  const currentWatchOption = watchOptionMap[selectedWatchOption] as
    | "flatrate"
    | "rent"
    | "buy";
  const currentProviders = countryProviders
    ? countryProviders[currentWatchOption]
    : [];

  return (
    <div className="mt-20">
      <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 space-x-3">
        <h2>Available On</h2>

        <div className="flex space-x-3">
          <div className="flex max-w-40">
            <Combobox
              items={countries}
              value={selectedCountry}
              onValueChange={handleCountryChange}
            >
              <ComboboxInput placeholder="Select a country" />

              <ComboboxContent>
                <ComboboxEmpty>Country not found.</ComboboxEmpty>
                <ComboboxList>
                  {(country) => (
                    <ComboboxItem key={country} value={country}>
                      {country}
                    </ComboboxItem>
                  )}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
          </div>

          <div className="flex max-w-20">
            <Select
              value={selectedWatchOption}
              onValueChange={handleWatchOptionChange}
            >
              <SelectTrigger className="w-45">
                <SelectValue placeholder="Select Watch Option" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="Stream">Stream</SelectItem>
                  <SelectItem value="Rent">Rent</SelectItem>
                  <SelectItem value="Buy">Buy</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="space-x-3 space-y-3 mt-5">
        {currentProviders &&
          currentProviders
            .sort((a, b) => a.display_priority - b.display_priority)
            .slice(0, 4)
            .map((provider) => (
              <Badge
                key={provider.provider_id}
                variant={"secondary"}
                className="p-5 space-x-1"
              >
                <div className="rounded-full overflow-hidden">
                  <Image
                    src={`/images${provider.logo_path}`}
                    alt="provider logo"
                    width={30}
                    height={30}
                    unoptimized
                  />
                </div>
                <p className="font-semibold">{provider.provider_name}</p>
              </Badge>
            ))}
      </div>
      {!selectedCountry && (
        <p className="text-sm text-muted-foreground mt-4">
          Please select a country to see streaming providers.
        </p>
      )}
    </div>
  );
}
