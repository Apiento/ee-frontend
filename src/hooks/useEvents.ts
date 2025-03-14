import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  price: number;
  image: string;
  capacity: number;
  remainingTickets: number;
  organizer: {
    name: string;
    avatar: string;
  };
  attendees: {
    count: number;
    avatars: string[];
  };
}

interface EventsStore {
  interestedEvents: Set<string>;
  toggleInterested: (eventId: string) => void;
  isInterested: (eventId: string) => boolean;
}

export const useEvents = create<EventsStore>()(
  persist(
    (set, get) => ({
      interestedEvents: new Set<string>(),
      toggleInterested: (eventId: string) => {
        set((state) => {
          const newInterested = new Set(state.interestedEvents);
          if (newInterested.has(eventId)) {
            newInterested.delete(eventId);
          } else {
            newInterested.add(eventId);
          }
          return { interestedEvents: newInterested };
        });
      },
      isInterested: (eventId: string) => {
        return get().interestedEvents.has(eventId);
      },
    }),
    {
      name: 'events-storage',
    }
  )
);