export const watchOptionMap: WatchOptionMap = {
  Stream: "flatrate",
  Buy: "buy",
  Rent: "rent",
};

export const COUNTRIES: CountryObject[] = [
  { name: "🇺🇸 United States", code: "US" },
  { name: "🇩🇪 Germany", code: "DE" },
  { name: "🇬🇧 United Kingdom", code: "GB" },
  { name: "🇫🇷 France", code: "FR" },
  { name: "🇮🇹 Italy", code: "IT" },
  { name: "🇪🇸 Spain", code: "ES" },
  { name: "🇵🇹 Portugal", code: "PT" },
  { name: "🇨🇭 Switzerland", code: "CH" },
  { name: "🇦🇹 Austria", code: "AT" },
  { name: "🇩🇰 Denmark", code: "DK" },
  { name: "🇸🇪 Sweden", code: "SE" },
];

interface WatchOptionMap {
  [watchOption: string]: string;
}

export interface CountryObject {
  name: string;
  code: string;
}
