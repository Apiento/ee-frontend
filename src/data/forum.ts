import { mockUsers } from './users';

export const mockPosts = [
  {
    id: '1',
    title: 'The Evolution of Electronic Music Production',
    content: `From hardware synthesizers to DAWs, the journey of electronic music production has been fascinating...`,
    category: 'music',
    votes: 42,
    replies: 15,
    created_at: '2024-02-14T10:00:00Z',
    user: mockUsers[0] // Sarah Chen
  },
  {
    id: '2',
    title: 'Upcoming Underground Events in Berlin',
    content: `Looking for recommendations for underground electronic music events in Berlin this summer...`,
    category: 'events',
    votes: 38,
    replies: 23,
    created_at: '2024-02-14T09:30:00Z',
    user: mockUsers[1] // Michael Kim
  },
  {
    id: '3',
    title: 'The Return of Vinyl: More Than Just Nostalgia?',
    content: `With vinyl sales continuing to rise, let's discuss the impact on music culture...`,
    category: 'culture',
    votes: 35,
    replies: 19,
    created_at: '2024-02-14T09:00:00Z',
    user: mockUsers[2] // Emma Thompson
  },
  {
    id: '4',
    title: 'Modular Synthesis: Getting Started Guide',
    content: `A comprehensive guide to entering the world of modular synthesis...`,
    category: 'tech',
    votes: 29,
    replies: 12,
    created_at: '2024-02-14T08:30:00Z',
    user: mockUsers[3] // David Wilson
  },
  {
    id: '5',
    title: 'The Impact of AI on Music Creation',
    content: `Exploring how artificial intelligence is changing the landscape of music production...`,
    category: 'tech',
    votes: 45,
    replies: 28,
    created_at: '2024-02-14T08:00:00Z',
    user: mockUsers[4] // Alex Rivera
  },
  {
    id: '6',
    title: 'Best Ambient Albums of 2024 (So Far)',
    content: `Let's compile a list of the most innovative ambient releases this year...`,
    category: 'music',
    votes: 31,
    replies: 16,
    created_at: '2024-02-14T07:30:00Z',
    user: mockUsers[5] // Nina Patel
  },
  {
    id: '7',
    title: 'Sound Design Resources and Techniques',
    content: `Sharing useful resources and techniques for sound design in electronic music...`,
    category: 'tech',
    votes: 33,
    replies: 21,
    created_at: '2024-02-14T07:00:00Z',
    user: mockUsers[6] // Marcus Johnson
  },
  {
    id: '8',
    title: 'Festival Season 2024: What Are You Attending?',
    content: `Share your festival plans and recommendations for this summer...`,
    category: 'events',
    votes: 27,
    replies: 34,
    created_at: '2024-02-14T06:30:00Z',
    user: mockUsers[7] // Sophie Martin
  },
  {
    id: '9',
    title: 'The Role of Physical Music Spaces Post-Pandemic',
    content: `Discussing the evolution and importance of physical music venues and record stores...`,
    category: 'culture',
    votes: 39,
    replies: 25,
    created_at: '2024-02-14T06:00:00Z',
    user: mockUsers[8] // James Lee
  },
  {
    id: '10',
    title: 'Favorite DAW Plugins and VSTs 2024',
    content: `What are your go-to plugins for music production this year?...`,
    category: 'tech',
    votes: 36,
    replies: 42,
    created_at: '2024-02-14T05:30:00Z',
    user: mockUsers[9] // Olivia Brown
  }
];