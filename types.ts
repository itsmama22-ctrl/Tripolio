export interface Stay {
  id: string;
  name: string;
  price: string;
  rating: number;
  location: {
    city: string;
    country: string;
    latitude: number;
    longitude: number;
  };
  amenities: string[];
  photos: string[];
  affiliateUrl: string;
  shortDescription: string;
  description: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  coverImage: string;
  category?: string;
  tags?: string[];
  content?: string;
}

export interface NearbyPlace {
  id: string;
  name: string;
  distance: number;
  latitude: number;
  longitude: number;
  kinds: string[];
}
