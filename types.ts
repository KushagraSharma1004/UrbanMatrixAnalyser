export interface Establishment {
  name: string;
  category: string;
  description: string;
  latitude: number;
  longitude: number;
}

export interface SortOption {
  field: keyof Omit<Establishment, 'description' | 'latitude' | 'longitude'>;
  order: 'asc' | 'desc';
}

export interface Category {
  id: string;
  label: string;
}

export interface LatLng {
  lat: number;
  lng: number;
}
