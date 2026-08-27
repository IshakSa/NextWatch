"use client";

import { useEffect, useState } from "react";
import SelectButton from "./_components/SelectButton";
import ComboboxButton from "./_components/ComboboxButton";
import { COUNTRIES, CountryObject, watchOptionMap } from "./constants";
import ProviderCard from "./_components/ProviderCard";
import { Providers } from "@/types";
import { PlayOffIcon } from "lucide-react";

function getProviderCountryPreference() {
  const providerCountry = localStorage.getItem("providerCountryPreference");

  if (!providerCountry) {
    return COUNTRIES[0];
  }

  const foundProviderCountry = COUNTRIES.find((country) => country.code === providerCountry);

  if (!foundProviderCountry) {
    return COUNTRIES[0];
  }

  return foundProviderCountry;
}

function saveProviderCountryPreference(country: CountryObject) {
  localStorage.setItem("providerCountryPreference", country.code);
}

export default function WatchProviders({ providers }: { providers: Providers }) {
  const [selectedCountry, setSelectedCountry] = useState(() => {
    if (typeof window !== "undefined") {
      return getProviderCountryPreference();
    }
    return COUNTRIES[0];
  });
  const [selectedWatchOption, setSelectedWatchOption] = useState("Stream");

  useEffect(() => {
    saveProviderCountryPreference(selectedCountry);
  }, [selectedCountry]);

  const countryProviders = providers[selectedCountry.code];

  const currentWatchOption = watchOptionMap[selectedWatchOption] as "flatrate" | "rent" | "buy";
  const currentProviders = countryProviders?.[currentWatchOption] ?? [];

  return (
    <div className="mt-20">
      <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 space-x-3">
        <h2>Available On</h2>

        <div className="flex space-x-3">
          <div className="flex max-w-40 rounded-lg">
            <ComboboxButton
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
        {currentProviders.length !== 0 ? (
          currentProviders
            .sort((a, b) => a.displayPriority - b.displayPriority)
            .slice(0, 4)
            .map((provider) => <ProviderCard key={provider.providerId} provider={provider} />)
        ) : (
          <div className="flex space-x-2 items-center text-muted-foreground">
            <PlayOffIcon />
            <p className="font-semibold">No available provider found</p>
          </div>
        )}
      </div>
    </div>
  );
}
