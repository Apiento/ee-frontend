import React, { useState } from 'react';
import { Calendar, MapPin, Clock, Users, Heart, Ticket, Search } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { useEvents, type Event } from '../hooks/useEvents';

// Mock data - would come from Supabase in production
const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Electronic Music Festival',
    description: 'A three-day festival featuring the best in electronic music',
    date: '2024-03-15',
    time: '12:00 PM',
    location: 'Amsterdam, Netherlands',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=500&q=80',
    capacity: 5000,
    remainingTickets: 2500,
    organizer: {
      name: 'Dekmantel',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&q=80'
    },
    attendees: {
      count: 2500,
      avatars: [
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&q=80',
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&q=80',
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&q=80'
      ]
    }
  },
  {
    id: '2',
    title: 'Modular Synthesis Workshop',
    description: 'Learn the basics of modular synthesis with industry experts',
    date: '2024-03-20',
    time: '2:00 PM',
    location: 'Berlin, Germany',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=500&q=80',
    capacity: 50,
    remainingTickets: 15,
    organizer: {
      name: 'Synthesis Academy',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&q=80'
    },
    attendees: {
      count: 35,
      avatars: [
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=50&h=50&q=80',
        'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=50&h=50&q=80'
      ]
    }
  },
  {
    id: '3',
    title: 'Sound Installations Exhibition',
    description: 'An immersive exhibition of sound art and installations',
    date: '2024-03-25',
    time: '10:00 AM',
    location: 'London, UK',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=500&q=80',
    capacity: 200,
    remainingTickets: 75,
    organizer: {
      name: 'Sound Art Gallery',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=50&h=50&q=80'
    },
    attendees: {
      count: 125,
      avatars: [
        'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=50&h=50&q=80',
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=50&h=50&q=80'
      ]
    }
  },
  {
    id: '4',
    title: 'Boiler Room x Everything Everywhere',
    description: 'Live streaming event featuring underground electronic music',
    date: '2024-03-30',
    time: '8:00 PM',
    location: 'New York, USA',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&q=80',
    capacity: 300,
    remainingTickets: 100,
    organizer: {
      name: 'Boiler Room',
      avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=50&h=50&q=80'
    },
    attendees: {
      count: 200,
      avatars: [
        'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=50&h=50&q=80',
        'https://images.unsplash.com/photo-1463453091185-61582044d556?w=50&h=50&q=80'
      ]
    }
  },
  {
    id: '5',
    title: 'Ambient Night',
    description: 'A night of ambient and experimental electronic music',
    date: '2024-04-05',
    time: '9:00 PM',
    location: 'Tokyo, Japan',
    price: 19.99,
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=500&q=80',
    capacity: 150,
    remainingTickets: 50,
    organizer: {
      name: 'Ambient Collective',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=50&h=50&q=80'
    },
    attendees: {
      count: 100,
      avatars: [
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=50&h=50&q=80',
        'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=50&h=50&q=80'
      ]
    }
  },
  {
    id: '6',
    title: 'Synthesizer Meetup',
    description: 'Monthly meetup for synthesizer enthusiasts',
    date: '2024-04-10',
    time: '6:00 PM',
    location: 'Detroit, USA',
    price: 0,
    image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=500&q=80',
    capacity: 75,
    remainingTickets: 25,
    organizer: {
      name: 'Detroit Electronic Collective',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&q=80'
    },
    attendees: {
      count: 50,
      avatars: [
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&q=80',
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&q=80'
      ]
    }
  }
];

export function Events() {
  const [priceFilter, setPriceFilter] = useState<'all' | 'free' | 'paid'>('all');
  const [locationSearch, setLocationSearch] = useState('');
  const { toggleInterested, isInterested } = useEvents();
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const filteredEvents = mockEvents.filter(event => {
    const matchesPrice = 
      priceFilter === 'all' ? true :
      priceFilter === 'free' ? event.price === 0 :
      event.price > 0;

    const matchesLocation = 
      locationSearch === '' ? true :
      event.location.toLowerCase().includes(locationSearch.toLowerCase());

    return matchesPrice && matchesLocation;
  });

  const handlePurchase = (event: Event) => {
    setSelectedEvent(event);
    setShowPurchaseModal(true);
  };

  return (
    <div className="space-y-6 m-6">
      <div className="flex flex-col space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <h1 className="heading-lg text-gray-900">Events</h1>
          </div>
          <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setPriceFilter('all')}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                priceFilter === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setPriceFilter('free')}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                priceFilter === 'free'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Free
            </button>
            <button
              onClick={() => setPriceFilter('paid')}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                priceFilter === 'paid'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Paid
            </button>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-1 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search by location..."
            value={locationSearch}
            onChange={(e) => setLocationSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map(event => (
          <div key={event.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="aspect-video relative">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/20 to-transparent" />
              <div className="absolute top-2 right-2">
                <button
                  onClick={() => toggleInterested(event.id)}
                  className={`p-1.5 rounded-full transition-colors ${
                    isInterested(event.id)
                      ? 'bg-blue-600 text-white'
                      : 'bg-white/90 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Heart className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="p-4 space-y-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-1">{event.title}</h2>
                <p className="text-sm text-gray-600">{event.description}</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                  <span>{format(parseISO(event.date), 'MMMM d, yyyy')}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="w-4 h-4 mr-2 text-gray-400" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                  <span>{event.location}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="flex -space-x-2">
                    {event.attendees.avatars.map((avatar, index) => (
                      <img
                        key={index}
                        src={avatar}
                        alt="Attendee"
                        className="w-6 h-6 rounded-full border-2 border-white"
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    {event.attendees.count} attending
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-900">
                    {event.price === 0 ? 'Free' : `$${event.price.toFixed(2)}`}
                  </span>
                </div>
              </div>

              <button
                onClick={() => handlePurchase(event)}
                className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
              >
                <Ticket className="w-4 h-4" />
                <span>{event.price === 0 ? 'Register' : 'Buy Ticket'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {showPurchaseModal && selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6 space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">Purchase Ticket</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Event</span>
                <span className="text-gray-900 font-medium">{selectedEvent.title}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Price</span>
                <span className="text-gray-900 font-medium">
                  {selectedEvent.price === 0 ? 'Free' : `$${selectedEvent.price.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Remaining Tickets</span>
                <span className="text-gray-900 font-medium">{selectedEvent.remainingTickets}</span>
              </div>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => setShowPurchaseModal(false)}
                className="flex-1 py-2 text-gray-600 hover:text-gray-900"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // Handle purchase logic here
                  setShowPurchaseModal(false);
                }}
                className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}