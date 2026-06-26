import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";

export default function ComboboxButton({
  countries,
  selectedCountry,
  setSelectedCountry,
}: {
  countries: string[];
  selectedCountry: string | null;
  setSelectedCountry: (newSelectedCountry: string) => void;
}) {
  function handleCountryChange(value: string | null) {
    if (value) setSelectedCountry(value);
  }

  return (
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
  );
}
