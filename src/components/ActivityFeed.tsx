import React from 'react';
import { Music, Calendar, Clock } from 'lucide-react';
import { format } from 'date-fns';

type Activity = {
  id: string;
  type: 'purchase' | 'event';
  title: string;
  date: Date;
  user: string;
};

// This would normally come from your Supabase database
const mockActivities: Activity[] = [
  {
    id: '1',
    type: 'purchase',
    title: 'Ambient Collection Vol. 1',
    date: new Date(),
    user: 'Sarah Chen'
  },
  {
    id: '2',
    type: 'event',
    title: 'Electronic Music Festival',
    date: new Date(Date.now() + 86400000 * 7), // 7 days from now
    user: 'Michael Kim'
  },
  {
    id: '3',
    type: 'purchase',
    title: 'Jazz Standards Bundle',
    date: new Date(Date.now() - 86400000), // 1 day ago
    user: 'David Wilson'
  },
  {
    id: '4',
    type: 'event',
    title: 'Classical Piano Night',
    date: new Date(Date.now() + 86400000 * 14), // 14 days from now
    user: 'Emma Thompson'
  }
];

export function ActivityFeed() {
  return (
    <div className="space-y-6">
      {mockActivities.map((activity) => (
        <div 
          key={activity.id}
          className="bg-gray-900 p-6 border-b border-gray-800 first:rounded-t-lg last:rounded-b-lg"
        >
          <div className="flex items-start space-x-4">
            <div className="p-2 bg-gray-800 rounded-full">
              {activity.type === 'purchase' ? (
                <Music className="w-6 h-6 text-blue-400" />
              ) : (
                <Calendar className="w-6 h-6 text-purple-400" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="text-lg font-medium text-white truncate">
                  {activity.title}
                </p>
                <div className="flex items-center text-gray-400">
                  <Clock className="w-4 h-4 mr-1" />
                  <time dateTime={activity.date.toISOString()}>
                    {format(activity.date, 'MMM d, yyyy')}
                  </time>
                </div>
              </div>
              <p className="mt-1 text-gray-400">
                {activity.type === 'purchase' 
                  ? `${activity.user} purchased this track`
                  : `${activity.user} is attending this event`}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}