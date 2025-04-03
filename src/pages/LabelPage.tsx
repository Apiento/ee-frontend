import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Globe, Calendar, Music, Users, Play, Pause, ShoppingBag } from 'lucide-react';
import { mockLabels } from '../data/store';
import { usePlayer } from '../hooks/usePlayer';
import { BuyersList } from '../components/BuyersList';
import type { Merchandise } from '../types/store';

export function LabelPage() {
  const { id } = useParams();
  const label = mockLabels.find(l => l.id === id);
  const { playTrack, currentTrack, isPlaying } = usePlayer();
  const [selectedMerch, setSelectedMerch] = useState<Merchandise | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<{size?: string; color?: string} | null>(null);
  const [activeSection, setActiveSection] = useState<'releases' | 'merchandise'>('releases');

  if (!label) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Label not found</p>
        <Link to="/store" className="text-blue-600 hover:text-blue-700 mt-4 inline-block">
          Return to Store
        </Link>
      </div>
    );
  }

  return (
    <div id="label" className="space-y-8">
      <Link
        to="/store"
        className="inline-flex items-center text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Store
      </Link>

      <div className="card">
        <div className="aspect-video relative">
          <img
            src={label.logo}
            alt={label.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <h1 className="heading-lg text-white mb-4">{label.name}</h1>
            <p className="text-xl text-white/90">{label.description}</p>
          </div>
        </div>
        
        <div className="p-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            <div className="p-4 bg-gray-50 rounded-lg">
              <Calendar className="w-5 h-5 text-blue-600 mb-2" />
              <div className="text-sm text-gray-600">Founded</div>
              <div className="text-gray-900 font-medium">{label.founded}</div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <Globe className="w-5 h-5 text-green-600 mb-2" />
              <div className="text-sm text-gray-600">Location</div>
              <div className="text-gray-900 font-medium">{label.location}</div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <Music className="w-5 h-5 text-blue-600 mb-2" />
              <div className="text-sm text-gray-600">Releases</div>
              <div className="text-gray-900 font-medium">
                {label.artists.reduce((acc, artist) => acc + artist.releases.length, 0)}
              </div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <Users className="w-5 h-5 text-blue-600 mb-2" />
              <div className="text-sm text-gray-600">Artists</div>
              <div className="text-gray-900 font-medium">{label.artists.length}</div>
            </div>
            <div 
              className={`p-4 bg-gray-50 rounded-lg cursor-pointer transition-colors ${
                activeSection === 'merchandise' ? 'ring-2 ring-blue-500' : 'hover:bg-gray-100'
              }`}
              onClick={() => setActiveSection('merchandise')}
            >
              <ShoppingBag className="w-5 h-5 text-purple-600 mb-2" />
              <div className="text-sm text-gray-600">Merchandise</div>
              <div className="text-gray-900 font-medium">{label.merchandise.length} items</div>
            </div>
          </div>

          {activeSection === 'merchandise' ? (
            <div className="space-y-6">
              <h2 className="text-2xl font-display font-semibold text-gray-900">Merchandise</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {label.merchandise.map(merch => (
                  <div key={merch.id} className="card">
                    <div className="aspect-square relative">
                      <img
                        src={merch.image}
                        alt={merch.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-display font-medium text-gray-900 mb-1">
                        {merch.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-4">{merch.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-900 font-medium">
                          ${merch.price.toFixed(2)}
                        </span>
                        <button
                          onClick={() => {
                            setSelectedMerch(merch);
                            setSelectedVariant(null);
                          }}
                          className="button-primary flex items-center space-x-2"
                        >
                          <ShoppingBag className="w-4 h-4" />
                          <span>Add to Cart</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-12">
              {label.artists.map(artist => (
                <div key={artist.id} className="space-y-6">
                  <Link
                    to={`/store/label/${label.id}/artist/${artist.id}`}
                    className="flex items-center space-x-4 group"
                  >
                    <img
                      src={artist.image}
                      alt={artist.name}
                      className="w-16 h-16 rounded-full object-cover group-hover:ring-2 ring-blue-500"
                    />
                    <div>
                      <h2 className="text-2xl font-display font-semibold text-gray-900 group-hover:text-blue-600">
                        {artist.name}
                      </h2>
                      <p className="text-gray-600">{artist.bio}</p>
                    </div>
                  </Link>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {artist.releases.map(release => (
                      <div
                        key={release.id}
                        className="card group"
                      >
                        <div className="aspect-square relative">
                          <img
                            src={release.coverArt}
                            alt={release.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
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
                          <h3 className="text-lg font-display font-medium text-gray-900 mb-1">
                            {release.title}
                          </h3>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-gray-600">{release.format}</span>
                            <span className="text-gray-900 font-medium">
                              ${release.price.toFixed(2)}
                            </span>
                          </div>
                          <BuyersList releaseId={release.id} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Merchandise Modal */}
      {selectedMerch && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6 space-y-4">
            <div className="flex justify-between items-start">
              <h3 className="text-xl font-semibold text-gray-900">{selectedMerch.title}</h3>
              <button
                onClick={() => setSelectedMerch(null)}
                className="text-gray-400 hover:text-gray-500"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            </div>
            
            <img
              src={selectedMerch.image}
              alt={selectedMerch.title}
              className="w-full aspect-square object-cover rounded-lg"
            />
            
            <p className="text-gray-600">{selectedMerch.description}</p>
            
            {selectedMerch.variants && (
              <div className="space-y-4">
                {selectedMerch.variants[0].size && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Size</label>
                    <div className="grid grid-cols-4 gap-2">
                      {Array.from(new Set(selectedMerch.variants.map(v => v.size))).map(size => (
                        <button
                          key={size}
                          onClick={() => setSelectedVariant(v => ({ ...v, size }))}
                          className={`px-4 py-2 text-sm font-medium rounded-lg ${
                            selectedVariant?.size === size
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                
                {selectedMerch.variants[0].color && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
                    <div className="grid grid-cols-4 gap-2">
                      {Array.from(new Set(selectedMerch.variants.map(v => v.color))).map(color => (
                        <button
                          key={color}
                          onClick={() => setSelectedVariant(v => ({ ...v, color }))}
                          className={`px-4 py-2 text-sm font-medium rounded-lg ${
                            selectedVariant?.color === color
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                          }`}
                        >
                          {color}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
            
            <div className="flex items-center justify-between pt-4">
              <span className="text-xl font-semibold text-gray-900">
                ${selectedMerch.price.toFixed(2)}
              </span>
              <button
                onClick={() => {
                  // Add to cart logic here
                  setSelectedMerch(null);
                }}
                className="button-primary"
                disabled={selectedMerch.variants && !selectedVariant}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}