import React from 'react';
import { Play, Pause, SkipForward, Heart, Volume2, X } from 'lucide-react';
import { usePlayer } from '../hooks/usePlayer';

export function MusicPlayer() {
  const {
    currentTrack,
    currentRelease,
    isPlaying,
    togglePlay,
    toggleLikeRelease,
    isReleaseLiked,
    closePlayer
  } = usePlayer();

  if (!currentTrack || !currentRelease) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/50 backdrop-blur-xl border-t border-white/5 p-4">
      <div className="max-w-8xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <img
            src={currentRelease.coverArt}
            alt={currentRelease.title}
            className="w-14 h-14 rounded object-cover"
          />
          <div>
            <h3 className="font-display text-white font-medium">{currentTrack.title}</h3>
            <p className="text-sm text-gray-400">{currentRelease.artist}</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={togglePlay}
            className="p-3 rounded-full bg-white text-black hover:bg-gray-200 transition-colors"
          >
            {isPlaying ? (
              <Pause className="w-6 h-6" />
            ) : (
              <Play className="w-6 h-6" />
            )}
          </button>
          <button className="p-2 text-gray-400 hover:text-white transition-colors">
            <SkipForward className="w-6 h-6" />
          </button>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={() => toggleLikeRelease(currentRelease.id)}
            className="p-2 text-gray-400 hover:text-white transition-colors"
          >
            <Heart
              className={`w-6 h-6 ${
                isReleaseLiked(currentRelease.id) ? 'fill-current text-red-500' : ''
              }`}
            />
          </button>
          <button className="p-2 text-gray-400 hover:text-white transition-colors">
            <Volume2 className="w-6 h-6" />
          </button>
          <button
            onClick={closePlayer}
            className="p-2 text-gray-400 hover:text-white transition-colors"
            title="Close Player"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}