import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Track, Release } from '../types/store';

interface PlayerState {
  currentTrack: Track | null;
  currentRelease: Release | null;
  isPlaying: boolean;
  queue: Track[];
  likedReleases: string[];
  playTrack: (track: Track, release: Release) => void;
  pauseTrack: () => void;
  togglePlay: () => void;
  addToQueue: (track: Track) => void;
  removeFromQueue: (trackId: string) => void;
  toggleLikeRelease: (releaseId: string) => void;
  isReleaseLiked: (releaseId: string) => boolean;
  closePlayer: () => void;
}

export const usePlayer = create<PlayerState>()(
  persist(
    (set, get) => ({
      currentTrack: null,
      currentRelease: null,
      isPlaying: false,
      queue: [],
      likedReleases: [],

      playTrack: (track, release) => {
        const audio = new Audio(track.streamUrl);
        audio.play();
        set({
          currentTrack: track,
          currentRelease: release,
          isPlaying: true
        });
      },

      pauseTrack: () => {
        set({ isPlaying: false });
      },

      togglePlay: () => {
        const { isPlaying } = get();
        set({ isPlaying: !isPlaying });
      },

      addToQueue: (track) => {
        set((state) => ({
          queue: [...state.queue, track]
        }));
      },

      removeFromQueue: (trackId) => {
        set((state) => ({
          queue: state.queue.filter((t) => t.id !== trackId)
        }));
      },

      toggleLikeRelease: (releaseId) => {
        set((state) => {
          const isLiked = state.likedReleases.includes(releaseId);
          return {
            likedReleases: isLiked
              ? state.likedReleases.filter(id => id !== releaseId)
              : [...state.likedReleases, releaseId]
          };
        });
      },

      isReleaseLiked: (releaseId) => {
        const state = get();
        return Array.isArray(state.likedReleases) && state.likedReleases.includes(releaseId);
      },

      closePlayer: () => {
        set({
          currentTrack: null,
          currentRelease: null,
          isPlaying: false
        });
      }
    }),
    {
      name: 'player-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        likedReleases: state.likedReleases,
        queue: state.queue
      })
    }
  )
);