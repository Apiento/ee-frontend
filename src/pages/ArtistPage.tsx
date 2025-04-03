import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Play, Pause, Globe, Calendar } from 'lucide-react';
import { mockLabels } from '../data/store';
import { usePlayer } from '../hooks/usePlayer';

export function ArtistPage() {
  const { labelId, artistId } = useParams();
  const { playTrack, currentTrack, isPlaying } = usePlayer();
  
  const label = mockLabels.find(l => l.id === labelId);
  const artist = label?.artists.find(a => a.id === artistId);

  if (!artist || !label) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400">Artist not found</p>
        <Link to="/store" className="text-blue-400 hover:text-blue-300 mt-4 inline-block">
          Return to Store
        </Link>
      </div>
    );
  }

  return (
    <div id="artist" className="space-y-8">
      <Link
        to={`/store/label/${labelId}`}
        className="inline-flex items-center text-gray-400 hover:text-white"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to {label.name}
      </Link>

      <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800">
        <div className="aspect-video relative">
          <img
            src={artist.image}
            alt={artist.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <h1 className="text-4xl font-bold text-white mb-4">{artist.name}</h1>
            <p className="text-xl text-gray-300">{artist.bio}</p>
          </div>
        </div>

        <div className="p-8">
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="p-4 bg-gray-800 rounded-lg">
              <Globe className="w-5 h-5 text-blue-400 mb-2" />
              <div className="text-sm text-gray-400">Label</div>
              <div className="text-white font-medium">{label.name}</div>
            </div>
            <div className="p-4 bg-gray-800 rounded-lg">
              <Calendar className="w-5 h-5 text-green-400 mb-2" />
              <div className="text-sm text-gray-400">Releases</div>
              <div className="text-white font-medium">{artist.releases.length}</div>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-white mb-6">Releases</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {artist.releases.map(release => (
              <div
                key={release.id}
                className="bg-gray-800 rounded-lg overflow-hidden group"
              >
                <div className="aspect-square relative">
                  <img
                    src={release.coverArt}
                    alt={release.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button
                      onClick={() => {
                        if (release.tracks.length > 0) {
                          playTrack(release.tracks[0], release);
                        }
                      }}
                      className="p-4 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                    >
                      {currentTrack?.id === release.tracks[0].id && isPlaying ? (
                        <Pause className="w-6 h-6" />
                      ) : (
                        <Play className="w-6 h-6" />
                      )}
                    </button>
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="text-lg font-medium text-white mb-1">
                    {release.title}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">{release.format}</span>
                    <span className="text-white font-medium">
                      ${release.price.toFixed(2)}
                    </span>
                  </div>
                  
                  <div className="mt-4 space-y-2">
                    {release.tracks.map(track => (
                      <div
                        key={track.id}
                        className="flex items-center justify-between text-sm"
                      >
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => playTrack(track, release)}
                            className="p-1 hover:bg-gray-700 rounded"
                          >
                            {currentTrack?.id === track.id && isPlaying ? (
                              <Pause className="w-4 h-4 text-blue-400" />
                            ) : (
                              <Play className="w-4 h-4 text-gray-400" />
                            )}
                          </button>
                          <span className="text-gray-300">{track.title}</span>
                        </div>
                        <span className="text-gray-400">{track.duration}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}