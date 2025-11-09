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

export interface AffiliateCTA {
  headline: string;
  body: string;
  ctaLabel: string;
  url: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  seoTitle: string;
  seoDescription: string;
  imageUrl: string;
  imageAlt: string;
  author: string;
  dateScheduled: string;
  published: boolean;
  publishedAt: string;
  readingTime: number;
  affiliateCta: AffiliateCTA[];
  createdAt: string;
}

export interface NearbyPlace {
  id: string;
  name: string;
  distance: number;
  latitude: number;
  longitude: number;
  kinds: string[];
}
