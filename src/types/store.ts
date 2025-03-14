export interface Label {
  id: string;
  name: string;
  description: string;
  logo: string;
  founded: string;
  location: string;
  artists: Artist[];
  merchandise: Merchandise[];
}

export interface Artist {
  id: string;
  name: string;
  bio: string;
  image: string;
  releases: Release[];
}

export interface Release {
  id: string;
  title: string;
  coverArt: string;
  price: number;
  releaseDate: string;
  format: 'Digital' | 'Vinyl' | 'CD';
  description: string;
  tracks: Track[];
}

export interface Track {
  id: string;
  title: string;
  duration: string;
  streamUrl: string;
}

export interface Merchandise {
  id: string;
  title: string;
  description: string;
  image: string;
  price: number;
  category: 'clothing' | 'accessories' | 'prints' | 'other';
  variants?: {
    size?: string;
    color?: string;
  }[];
  inStock: boolean;
}