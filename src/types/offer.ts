export interface City {
  name: string,
  location: {
    latitude: number,
    longitude: number,
    zoom: number,
  }
}

export interface Host {
  id: number;
  isPro: boolean;
  name: string;
  avatarUrl: string;
}

export interface OfferLocation {
  latitude: number;
  longitude: number;
  zoom: number;
}

export interface Offer {
  id: number;
  city: City;
  previewImage: string;
  images: [string];
  title: string;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  type: string;
  bedrooms: number;
  maxAdults: number;
  price: number;
  goods: [string];
  host: Host,
  description: string;
  location: OfferLocation;
}

export interface CityOffersGroup {
  [key: string]: Offer[];
}
