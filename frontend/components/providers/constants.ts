export const countries = [
  "🇺🇸 United States",
  "🇬🇧 United Kingdom",
  "🇩🇪 Germany",
  "🇫🇷 France",
  "🇮🇹 Italy",
  "🇪🇸 Spain",
  "🇵🇹 Portugal",
  "🇨🇭 Switzerland",
  "🇦🇹 Austria",
  "🇩🇰 Denmark",
  "🇸🇪 Sweden",
];

export const countryMap: CountryObject = {
  "🇺🇸 United States": "US",
  "🇬🇧 United Kingdom": "GB",
  "🇩🇪 Germany": "DE",
  "🇫🇷 France": "FR",
  "🇮🇹 Italy": "IT",
  "🇪🇸 Spain": "ES",
  "🇵🇹 Portugal": "PT",
  "🇨🇭 Switzerland": "CH",
  "🇦🇹 Austria": "AT",
  "🇩🇰 Denmark": "DK",
  "🇸🇪 Sweden": "SE",
};

export const watchOptionMap: WatchOptionMap = {
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
