import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import { COUNTRIES, CountryObject } from "../constants";

export default function ComboboxButton({
  selectedCountry,
  setSelectedCountry,
}: {
  selectedCountry: CountryObject;
  setSelectedCountry: (newSelectedCountry: CountryObject) => void;
}) {
  function handleCountryChange(value: string | null) {
    const country = COUNTRIES.find((country) => country.name === value);
    if (country) setSelectedCountry(country);
  }

  return (
    <Combobox items={COUNTRIES} value={selectedCountry.name} onValueChange={handleCountryChange}>
      <ComboboxInput placeholder="Select a country" className="rounded-lg" />

      <ComboboxContent className="w-45" align="center" alignOffset={13}>
        <ComboboxEmpty>Country not found.</ComboboxEmpty>
        <ComboboxList>
          {(country: CountryObject) => (
            <ComboboxItem key={country.code} value={country.name}>
              {country.name}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}
