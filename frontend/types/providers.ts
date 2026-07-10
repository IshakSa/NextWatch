export interface Providers {
  [countryCode: string]: ProviderOptions;
}

export interface ProviderOptions {
  rent?: ProviderInfo[];
  flatrate?: ProviderInfo[];
  buy?: ProviderInfo[];
}

export interface ProviderInfo {
  logoPath: string;
  providerId: number;
  providerName: string;
  displayPriority: number;
}

export interface AvailableProviders {
  [countryCode: string]: ProviderInfo[];
}
