"use client";

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
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

  useEffect(() => {
    if (!selectedCountry) {
      setCountryProviders(null);
      return;
    }

    const currentProviders = providers[countryMap[selectedCountry]];
    setCountryProviders(currentProviders);
  }, [selectedCountry, providers]);

  function handleValueChange(value: string | null) {
    setSelectedCountry(value);
  }

  return (
    <div>
      <Combobox
        items={countries}
        value={selectedCountry}
        onValueChange={handleValueChange}
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

      {countryProviders?.flatrate &&
        countryProviders.flatrate
          .sort((a, b) => a.display_priority - b.display_priority)
          .slice(0, 4)
          .map((provider) => (
            <Badge key={provider.provider_id}>
              <Image
                src={`/images${provider.logo_path}`}
                alt="provider logo"
                width={24}
                height={24}
              />
              {provider.provider_name}
            </Badge>
          ))}
    </div>
  );
}
