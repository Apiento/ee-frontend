import type { Label, Release } from '../types/store';

export const mockLabels: Label[] = [
  {
    id: '1',
    name: 'Ethereal Sounds',
    description: 'Pioneering ambient and experimental electronic music since 2015.',
    logo: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=300&q=80',
    founded: '2015',
    location: 'Berlin, Germany',
    merchandise: [
      {
        id: 'm1',
        title: 'Ethereal Sounds Logo Tee',
        description: 'Classic black t-shirt with embroidered label logo',
        image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=500&q=80',
        price: 29.99,
        category: 'clothing',
        variants: [
          { size: 'S', color: 'Black' },
          { size: 'M', color: 'Black' },
          { size: 'L', color: 'Black' },
          { size: 'XL', color: 'Black' }
        ],
        inStock: true
      },
      {
        id: 'm2',
        title: 'Limited Edition Screen Print',
        description: 'Hand-numbered art print featuring our first release artwork',
        image: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=500&q=80',
        price: 49.99,
        category: 'prints',
        inStock: true
      }
    ],
    artists: [
      {
        id: '1',
        name: 'Stellar Dreams',
        bio: 'Creating ethereal soundscapes and ambient textures',
        image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=300&q=80',
        releases: [
          {
            id: '1',
            title: 'Midnight Atmospheres',
            coverArt: 'https://images.unsplash.com/photo-1496293455970-f8581aae0e3b?w=500&q=80',
            price: 24.99,
            releaseDate: '2024-02-15',
            format: 'Vinyl',
            description: 'A journey through ambient soundscapes and ethereal textures.',
            tracks: [
              { id: '1', title: 'Dawn Chorus', duration: '6:45', streamUrl: 'https://example.com/track1.mp3' },
              { id: '2', title: 'Nebula Dreams', duration: '7:30', streamUrl: 'https://example.com/track2.mp3' },
              { id: '3', title: 'Cosmic Drift', duration: '8:15', streamUrl: 'https://example.com/track3.mp3' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: '2',
    name: 'Deep Groove Records',
    description: 'Home of contemporary house and techno.',
    logo: 'https://images.unsplash.com/photo-1632150403063-b067959aafaf?w=300&q=80',
    founded: '2018',
    location: 'Detroit, USA',
    merchandise: [
      {
        id: 'm3',
        title: 'Deep Groove Hoodie',
        description: 'Premium quality hoodie with minimalist label design',
        image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&q=80',
        price: 59.99,
        category: 'clothing',
        variants: [
          { size: 'S', color: 'Navy' },
          { size: 'M', color: 'Navy' },
          { size: 'L', color: 'Navy' },
          { size: 'XL', color: 'Navy' }
        ],
        inStock: true
      },
      {
        id: 'm4',
        title: 'Vinyl Slipmat',
        description: 'Custom designed felt slipmat with label artwork',
        image: 'https://images.unsplash.com/photo-1461360228754-6e81c478b882?w=500&q=80',
        price: 19.99,
        category: 'accessories',
        inStock: true
      }
    ],
    artists: [
      {
        id: '2',
        name: 'Metro Rhythm',
        bio: 'Detroit techno meets deep house grooves',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80',
        releases: [
          {
            id: '2',
            title: 'Urban Pulse',
            coverArt: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=500&q=80',
            price: 29.99,
            releaseDate: '2024-03-01',
            format: 'Vinyl',
            description: 'Deep house grooves meets Detroit techno.',
            tracks: [
              { id: '4', title: 'City Lights', duration: '6:30', streamUrl: 'https://example.com/track4.mp3' },
              { id: '5', title: 'Night Drive', duration: '7:15', streamUrl: 'https://example.com/track5.mp3' },
              { id: '6', title: 'Underground', duration: '6:45', streamUrl: 'https://example.com/track6.mp3' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: '3',
    name: 'Future Bass Collective',
    description: 'Pushing the boundaries of bass music and future beats.',
    logo: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=300&q=80',
    founded: '2020',
    location: 'London, UK',
    merchandise: [
      {
        id: 'm5',
        title: 'Record Bag',
        description: 'Heavy duty DJ bag with padded compartments',
        image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=500&q=80',
        price: 79.99,
        category: 'accessories',
        inStock: true
      },
      {
        id: 'm6',
        title: 'Limited Edition Poster Set',
        description: 'Collection of three A2 posters featuring original artwork',
        image: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=500&q=80',
        price: 39.99,
        category: 'prints',
        inStock: true
      }
    ],
    artists: [
      {
        id: '3',
        name: 'Bass Horizon',
        bio: 'Exploring the frontiers of bass music',
        image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&q=80',
        releases: [
          {
            id: '3',
            title: 'Future Waves',
            coverArt: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&q=80',
            price: 19.99,
            releaseDate: '2024-03-15',
            format: 'Digital',
            description: 'Cutting-edge bass music with futuristic sound design.',
            tracks: [
              { id: '7', title: 'Future State', duration: '4:30', streamUrl: 'https://example.com/track7.mp3' },
              { id: '8', title: 'Wave Motion', duration: '5:15', streamUrl: 'https://example.com/track8.mp3' },
              { id: '9', title: 'Digital Dreams', duration: '4:45', streamUrl: 'https://example.com/track9.mp3' }
            ]
          }
        ]
      }
    ]
  }
];