import React, { useState } from 'react';
import { Users, Music, Calendar, Radio, UserPlus, UserCheck, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { mockUsers } from '../data/users';

export function Community() {
  const [filter, setFilter] = useState<'all' | 'listening' | 'events'>('all');
  const [following, setFollowing] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');

  const toggleFollow = (userId: string) => {
    setFollowing(prev => {
      const newFollowing = new Set(prev);
      if (newFollowing.has(userId)) {
        newFollowing.delete(userId);
      } else {
        newFollowing.add(userId);
      }
      return newFollowing;
    });
  };

  const filteredUsers = mockUsers.filter(user => {
    const matchesFilter = filter === 'all' ||
      (filter === 'listening' && user.currentlyPlaying) ||
      (filter === 'events' && user.upcomingEvents?.length);

    const matchesSearch = searchQuery.toLowerCase() === '' ||
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.currentlyPlaying?.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.currentlyPlaying?.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.upcomingEvents?.some(event => 
        event.title.toLowerCase().includes(searchQuery.toLowerCase())
      );

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6 m-6">
      <div className="flex items-center space-x-2">
        <h1 className="heading-lg text-gray-900">COMMUNITY</h1>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Sidebar */}
        <div className="md:w-64 shrink-0 space-y-6">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"/>
            <input
                type="text"
                placeholder="Search members..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Filter Buttons */}
          <div className="space-y-2">
            <h2 className="text-sm font-medium text-gray-900 mb-3">Show</h2>
            <button
                onClick={() => setFilter('all')}
                className={`w-full px-4 py-2 rounded-lg text-sm font-medium transition-colors text-left ${
                    filter === 'all'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
            >
              All Members
            </button>
            <button
                onClick={() => setFilter('listening')}
                className={`w-full px-4 py-2 rounded-lg text-sm font-medium transition-colors text-left ${
                    filter === 'listening'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
            >
              Currently Listening
            </button>
            <button
                onClick={() => setFilter('events')}
                className={`w-full px-4 py-2 rounded-lg text-sm font-medium transition-colors text-left ${
                    filter === 'events'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
            >
              Attending Events
            </button>
          </div>
        </div>

        {/* Members Grid */}
        <div className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredUsers.map(user => {
              const isFollowing = following.has(user.id);

              return (
                  <div key={user.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                    <div className="aspect-square relative">
                      <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"/>
                      <div className="absolute top-2 right-2">
                        <button
                            onClick={() => toggleFollow(user.id)}
                            className={`p-1.5 rounded-full transition-colors ${
                                isFollowing
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-white/90 text-gray-700 hover:bg-gray-100'
                            }`}
                        >
                          {isFollowing ? (
                              <UserCheck className="w-4 h-4"/>
                          ) : (
                              <UserPlus className="w-4 h-4"/>
                          )}
                        </button>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <Link
                            to={`/forum?user=${user.id}`}
                            className="text-sm font-medium text-white mb-1 hover:text-blue-200"
                        >
                          {user.name}
                        </Link>
                        {user.currentlyPlaying && (
                            <p className="text-xs text-gray-200 flex items-center">
                              <Radio className="w-3 h-3 mr-1"/>
                              {user.currentlyPlaying.title}
                            </p>
                        )}
                      </div>
                    </div>

                    <div className="p-3 space-y-2">
                      {user.upcomingEvents && user.upcomingEvents.length > 0 && (
                          <div>
                            <h3 className="text-xs font-medium text-gray-600 flex items-center mb-2">
                              <Calendar className="w-3 h-3 mr-1"/>
                              Upcoming
                            </h3>
                            {user.upcomingEvents.map(event => (
                                <div key={event.id} className="flex items-center space-x-2">
                                  <img
                                      src={event.image}
                                      alt={event.title}
                                      className="w-8 h-8 rounded object-cover"
                                  />
                                  <div>
                                    <p className="text-xs text-gray-900">{event.title}</p>
                                    <p className="text-xs text-gray-500">{event.date}</p>
                                  </div>
                                </div>
                            ))}
                          </div>
                      )}

                      {user.recentPurchases.length > 0 && (
                          <div>
                            <h3 className="text-xs font-medium text-gray-600 flex items-center mb-2">
                              <Music className="w-3 h-3 mr-1"/>
                              Recent
                            </h3>
                            {user.recentPurchases.map(purchase => (
                                <div key={purchase.id} className="flex items-center space-x-2">
                                  <img
                                      src={purchase.coverArt}
                                      alt={purchase.title}
                                      className="w-8 h-8 rounded object-cover"
                                  />
                                  <div>
                                    <p className="text-xs text-gray-900">{purchase.title}</p>
                                    <p className="text-xs text-gray-500">{purchase.artist}</p>
                                  </div>
                                </div>
                            ))}
                          </div>
                      )}
                    </div>
                  </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}