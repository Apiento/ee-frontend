import React, { useState } from 'react';
import { ChevronDown, Users, Loader2, UserPlus, UserCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

interface BuyersListProps {
  releaseId: string;
}

// Mock data to match the Community page users
const mockBuyers = [
  {
    id: '1',
    username: 'Sarah Chen',
    avatar_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&q=80',
    purchase_date: '2024-02-15T10:00:00Z',
    is_following: false
  },
  {
    id: '2',
    username: 'Michael Kim',
    avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&q=80',
    purchase_date: '2024-02-14T15:30:00Z',
    is_following: false
  },
  {
    id: '3',
    username: 'Emma Thompson',
    avatar_url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&q=80',
    purchase_date: '2024-02-13T09:15:00Z',
    is_following: false
  }
];

export function BuyersList({ releaseId }: BuyersListProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [following, setFollowing] = useState<Set<string>>(new Set());

  const toggleFollow = (userId: string) => {
    setFollowing(prev => {
      const next = new Set(prev);
      if (next.has(userId)) {
        next.delete(userId);
      } else {
        next.add(userId);
      }
      return next;
    });
  };

  const getUserSlug = (username: string) => {
    return username.toLowerCase().replace(' ', '-');
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900"
      >
        <Users className="w-4 h-4" />
        <span>{mockBuyers.length} {mockBuyers.length === 1 ? 'person' : 'people'} bought this</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-10">
          {mockBuyers.map(buyer => (
            <div key={buyer.id} className="px-4 py-2 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <Link 
                  to={`/community?user=${getUserSlug(buyer.username)}`}
                  className="flex items-center space-x-3 group"
                >
                  <img
                    src={buyer.avatar_url}
                    alt={buyer.username}
                    className="w-8 h-8 rounded-full object-cover bg-gray-100 group-hover:ring-2 ring-blue-500"
                  />
                  <div>
                    <div className="text-sm font-medium text-gray-900 group-hover:text-blue-600">
                      {buyer.username}
                    </div>
                    <div className="text-xs text-gray-500">
                      Purchased {new Date(buyer.purchase_date).toLocaleDateString()}
                    </div>
                  </div>
                </Link>
                <button
                  onClick={() => toggleFollow(buyer.id)}
                  className={`p-1.5 rounded-full transition-colors ${
                    following.has(buyer.id)
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                  title={following.has(buyer.id) ? 'Following' : 'Follow'}
                >
                  {following.has(buyer.id) ? (
                    <UserCheck className="w-4 h-4" />
                  ) : (
                    <UserPlus className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}