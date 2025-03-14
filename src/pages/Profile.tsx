import React, { useState } from 'react';
import { User, Settings, LogOut, Music, Calendar, MessageCircle, Heart, Radio, Globe, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

// Mock data - would come from Supabase in production
const profileData = {
  name: 'Apiento',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&q=80',
  bio: 'Music curator, event organizer, and community builder. Host of Everything Everywhere Radio.',
  location: 'London, UK',
  memberSince: '2020',
  stats: {
    followers: 1234,
    following: 567,
    posts: 89
  },
  currentlyPlaying: {
    title: 'Selected Ambient Works',
    artist: 'Aphex Twin',
    startTime: new Date(Date.now() - 1000 * 60 * 15) // 15 minutes ago
  },
  recentActivity: [
    {
      type: 'purchase',
      title: 'Dreamfear EP',
      artist: 'Burial',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&q=80',
      timestamp: new Date(Date.now() - 1000 * 60 * 30) // 30 minutes ago
    },
    {
      type: 'event',
      title: 'Electronic Music Festival',
      location: 'Amsterdam',
      image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=100&q=80',
      timestamp: new Date(Date.now() - 1000 * 60 * 60) // 1 hour ago
    },
    {
      type: 'post',
      title: 'The Evolution of Electronic Music',
      replies: 12,
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
      timestamp: new Date(Date.now() - 1000 * 60 * 120) // 2 hours ago
    }
  ],
  upcomingEvents: [
    {
      id: '1',
      title: 'Ambient Night',
      date: '2024-03-15',
      location: 'Fabric, London',
      image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=100&q=80'
    },
    {
      id: '2',
      title: 'Deep Listening Session',
      date: '2024-03-20',
      location: 'The Waiting Room, London',
      image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=100&q=80'
    }
  ],
  likedReleases: [
    {
      id: '1',
      title: 'Selected Ambient Works',
      artist: 'Aphex Twin',
      image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=100&q=80'
    },
    {
      id: '2',
      title: 'Untrue',
      artist: 'Burial',
      image: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=100&q=80'
    },
    {
      id: '3',
      title: 'New Energy',
      artist: 'Four Tet',
      image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=100&q=80'
    }
  ]
};

export function Profile() {
  const [activeTab, setActiveTab] = useState<'activity' | 'events' | 'music'>('activity');

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Profile Header */}
      <div className="bg-gray-900 rounded-lg shadow-lg border border-gray-800 overflow-hidden">
        <div className="p-6">
          <div className="flex items-center space-x-4">
            <img
              src={profileData.avatar}
              alt={profileData.name}
              className="w-20 h-20 rounded-full object-cover"
            />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-white">{profileData.name}</h1>
                  <p className="text-gray-400">{profileData.bio}</p>
                </div>
                <div className="flex space-x-4">
                  <button className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 flex items-center">
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </button>
                  <button className="px-4 py-2 bg-red-900 text-red-100 rounded-lg hover:bg-red-800 flex items-center">
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </button>
                </div>
              </div>
              <div className="flex items-center space-x-4 mt-4 text-sm">
                <div className="flex items-center text-gray-400">
                  <Globe className="w-4 h-4 mr-1" />
                  {profileData.location}
                </div>
                <div className="text-gray-400">
                  Member since {profileData.memberSince}
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-800">
            <div className="flex space-x-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{profileData.stats.followers}</div>
                <div className="text-sm text-gray-400">Followers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{profileData.stats.following}</div>
                <div className="text-sm text-gray-400">Following</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{profileData.stats.posts}</div>
                <div className="text-sm text-gray-400">Posts</div>
              </div>
            </div>
            {profileData.currentlyPlaying && (
              <div className="flex items-center space-x-3 bg-gray-800 rounded-lg p-3">
                <Radio className="w-4 h-4 text-blue-400 animate-pulse" />
                <div>
                  <div className="text-sm text-white">{profileData.currentlyPlaying.title}</div>
                  <div className="text-xs text-gray-400 flex items-center">
                    <span>{profileData.currentlyPlaying.artist}</span>
                    <span className="mx-1">•</span>
                    <Clock className="w-3 h-3 mr-1" />
                    <span>Started {format(profileData.currentlyPlaying.startTime, 'h:mm a')}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-t border-gray-800">
          <button
            onClick={() => setActiveTab('activity')}
            className={`flex-1 px-4 py-3 text-sm font-medium ${
              activeTab === 'activity'
                ? 'text-blue-400 border-b-2 border-blue-400'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Recent Activity
          </button>
          <button
            onClick={() => setActiveTab('events')}
            className={`flex-1 px-4 py-3 text-sm font-medium ${
              activeTab === 'events'
                ? 'text-blue-400 border-b-2 border-blue-400'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Upcoming Events
          </button>
          <button
            onClick={() => setActiveTab('music')}
            className={`flex-1 px-4 py-3 text-sm font-medium ${
              activeTab === 'music'
                ? 'text-blue-400 border-b-2 border-blue-400'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Liked Music
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="space-y-4">
        {activeTab === 'activity' && (
          <div className="space-y-4">
            {profileData.recentActivity.map((activity, index) => (
              <div key={index} className="bg-gray-900 p-4 rounded-lg border border-gray-800">
                <div className="flex items-center space-x-3">
                  <img
                    src={activity.image}
                    alt={activity.title}
                    className="w-12 h-12 rounded object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      {activity.type === 'purchase' && <Music className="w-4 h-4 text-green-400" />}
                      {activity.type === 'event' && <Calendar className="w-4 h-4 text-purple-400" />}
                      {activity.type === 'post' && <MessageCircle className="w-4 h-4 text-blue-400" />}
                      <h3 className="text-white font-medium">{activity.title}</h3>
                    </div>
                    <div className="text-sm text-gray-400 mt-1">
                      {activity.type === 'purchase' && activity.artist && (
                        <span>Purchased {activity.artist}</span>
                      )}
                      {activity.type === 'event' && activity.location && (
                        <span>Going to event in {activity.location}</span>
                      )}
                      {activity.type === 'post' && activity.replies && (
                        <span>{activity.replies} replies</span>
                      )}
                      <span className="mx-1">•</span>
                      <span>{format(activity.timestamp, 'h:mm a')}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'events' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {profileData.upcomingEvents.map((event) => (
              <div key={event.id} className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden">
                <div className="aspect-video relative">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/20 to-transparent" />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-medium text-white mb-2">{event.title}</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center text-gray-400">
                      <Calendar className="w-4 h-4 mr-2" />
                      {format(new Date(event.date), 'MMMM d, yyyy')}
                    </div>
                    <div className="flex items-center text-gray-400">
                      <Globe className="w-4 h-4 mr-2" />
                      {event.location}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'music' && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {profileData.likedReleases.map((release) => (
              <div key={release.id} className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden">
                <div className="aspect-square relative">
                  <img
                    src={release.image}
                    alt={release.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/20 to-transparent" />
                  <div className="absolute top-2 right-2">
                    <Heart className="w-4 h-4 text-red-500 fill-current" />
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-white font-medium">{release.title}</h3>
                  <p className="text-sm text-gray-400">{release.artist}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}