
export enum ListingCategory {
  House = 'Houses',
  Apartment = 'Apartments',
  Land = 'Land',
}

export interface Property {
  id: number;
  category: ListingCategory;
  image: string;
  price: string;
  name: string;
  location: string;
  description: string;
  bedrooms?: number;
  bathrooms?: number;
  sqft?: number;
  gallery?: string[];
  amenities?: string[];
}
