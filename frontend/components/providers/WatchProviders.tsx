"use client";

import { ProviderOptions } from "@/lib/constants";
import { useState } from "react";
import SelectButton from "./_components/SelectButton";
import ComboboxButton from "./_components/ComboboxButton";
import { countries, countryMap, watchOptionMap } from "./constants";
import ProviderCard from "./_components/ProviderCard";

export default function WatchProviders({
  providers,
}: {
  providers: ProviderOptions;
}) {
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [selectedWatchOption, setSelectedWatchOption] = useState("Stream");

  const countryCode = selectedCountry ? countryMap[selectedCountry] : null;
  const countryProviders = countryCode ? providers[countryCode] : null;

  const currentWatchOption = watchOptionMap[selectedWatchOption] as
    | "flatrate"
    | "rent"
    | "buy";

  const currentProviders = countryProviders?.[currentWatchOption] ?? [];

  return (
    <div className="mt-20">
      <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 space-x-3">
        <h2>Available On</h2>

        <div className="flex space-x-3">
          <div className="flex max-w-40">
            <ComboboxButton
              countries={countries}
              selectedCountry={selectedCountry}
              setSelectedCountry={setSelectedCountry}
            />
          </div>

          <div className="flex max-w-20">
            <SelectButton
              selectedWatchOption={selectedWatchOption}
              setSelectedWatchOption={setSelectedWatchOption}
            />
          </div>
        </div>
      </div>

      <div className="space-x-3 space-y-3 mt-5">
        {currentProviders &&
          currentProviders
            .sort((a, b) => a.display_priority - b.display_priority)
            .slice(0, 4)
            .map((provider) => (
              <ProviderCard key={provider.provider_id} provider={provider} />
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
