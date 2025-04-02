import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {Calendar, MessageCircle, MessageSquare, Music, Radio, Store, User} from 'lucide-react';

export function Home() {
  const [showAllReleases, setShowAllReleases] = useState(false);
  const [showAllEvents, setShowAllEvents] = useState(false);
  const [showAllThreads, setShowAllThreads] = useState(false);

  const releases = [
    { title: 'Dreamfear EP', artist: 'Burial', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&q=80' },
    { title: 'Selected Ambient Works', artist: 'Aphex Twin', image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=100&q=80' },
    { title: 'Warp Records', artist: '30 Years of Innovation', image: 'https://images.unsplash.com/photo-1483412033650-1015ddeb83d1?w=100&q=80' },
    { title: 'New Energy', artist: 'Four Tet', image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=100&q=80' },
    { title: 'Immunity', artist: 'Jon Hopkins', image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=100&q=80' },
    { title: 'Promises', artist: 'Floating Points', image: 'https://images.unsplash.com/photo-1515104882246-2bbbf5680010?w=100&q=80' },
    { title: 'All Melody', artist: 'Nils Frahm', image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=100&q=80' },
    { title: 'Singularity', artist: 'Jon Hopkins', image: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=100&q=80' },
    { title: 'Rival Dealer', artist: 'Burial', image: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=100&q=80' },
    { title: 'Spaces', artist: 'Nils Frahm', image: 'https://images.unsplash.com/photo-1515104882246-2bbbf5680010?w=100&q=80' }
  ];

  const events = [
    { title: 'Dekmantel Festival', location: 'Amsterdam', image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=100&q=80', date: 'Mar 15' },
    { title: 'Ben UFO All Night Long', location: 'Panorama Bar, Berlin', image: 'https://images.unsplash.com/photo-1571935444382-b67f4c2087e4?w=100&q=80', date: 'Mar 20' },
    { title: 'Modular Synthesis Workshop', location: 'With Alessandro Cortini', image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=100&q=80', date: 'Mar 25' },
    { title: 'Boiler Room x Everything Everywhere', location: 'New York', image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=100&q=80', date: 'Mar 30' },
    { title: 'Ambient Night', location: 'Tokyo', image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=100&q=80', date: 'Apr 5' },
    { title: 'Synthesizer Meetup', location: 'Detroit', image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=100&q=80', date: 'Apr 10' },
    { title: 'Deep Listening Session', location: 'London', image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=100&q=80', date: 'Apr 15' },
    { title: 'Ambient Festival', location: 'Berlin', image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=100&q=80', date: 'Apr 20' },
    { title: 'Electronic Music Workshop', location: 'Paris', image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=100&q=80', date: 'Apr 25' },
    { title: 'Sound Art Exhibition', location: 'Barcelona', image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=100&q=80', date: 'Apr 30' }
  ];

  const threads = [
    { title: 'The Evolution of Electronic Music', author: 'Sarah Chen', replies: 12, image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80' },
    { title: 'Detroit Techno: A Visual History', author: 'Michael Kim', replies: 8, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80' },
    { title: 'The Future of Music Spaces', author: 'Emma Thompson', replies: 15, image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80' },
    { title: 'Modular Synthesis Tips', author: 'David Wilson', replies: 6, image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80' },
    { title: 'Favorite Ambient Albums', author: 'Alex Rivera', replies: 20, image: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=100&q=80' },
    { title: 'Live Performance Setup', author: 'Nina Patel', replies: 10, image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80' },
    { title: 'Sound Design Workshop Notes', author: 'Marcus Johnson', replies: 5, image: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&q=80' },
    { title: 'Record Collection Showcase', author: 'Sophie Martin', replies: 18, image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&q=80' },
    { title: 'Studio Monitor Recommendations', author: 'James Lee', replies: 14, image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=100&q=80' },
    { title: 'Music Production Workflow', author: 'Olivia Brown', replies: 9, image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&q=80' }
  ];

  return (
    <div>
      <div className="grid md:grid-cols-3">
        <Link to="/store" className="card card-hover" id="music">
          <div className="p-1 px-6 py-4 col-span-1">
            <h2 className="font-display tracking-tight">
              <Store className="w-7 h-7" strokeWidth={0.9} />
              &nbsp;discover music
            </h2>
            <p className="font-display tracking-tight">browse and purchase high-quality digital products.</p>
          </div>
        </Link>

        <Link to="/events" className="card card-hover" id="events">
          <div className="p-1 px-6 py-4 col-span-1">
            <h2 className="font-display tracking-tight">
              <Calendar className="w-7 h-7" strokeWidth={0.9} />
              &nbsp;discover events
            </h2>
            <p className="font-display tracking-tight">discover and book tickets for upcoming events.</p>
          </div>
        </Link>

        <Link to="/forum" className="card card-hover" id="forum">
          <div className="p-1 px-6 py-4 col-span-1">
            <h2 className="font-display tracking-tight">
              <MessageSquare className="w-7 h-7" strokeWidth={0.9} />
              &nbsp;forum
            </h2>
            <p className="font-display tracking-tight">join discussions with our community members.</p>
          </div>
        </Link>
      </div>

      <section>
        <div id="banner" className="p-2 border-b border-gray-200">
          <div className="flex items-center justify-between grid md:grid-cols-3">
            <div className="flex items-center space-x-3 col-span-1 px-4">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&q=80"
                alt="Apiento"
                className="w-6 h-6 rounded-full object-cover"
              />
              <h2 className="text-xl font-display tracking-tight mb-2">apiento's feed</h2>
            </div>
            <div className="col-span-1">
              <div className="flex items-center text-sm">
                <Radio className="w-8 h-8 mr-1" strokeWidth={1.5} />
                <span className="font-display tracking-tight mb-2">currently live</span>
              </div>
            </div>
            <div className="col-span-1">
              <div className="flex items-center text-sm">
                <User className="w-8 h-8" strokeWidth={1.5} />&nbsp;
                <Link to="/profile" className="font-display tracking-tight mb-2">
                  view profile
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="feeds">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          <div className="space-y-4" id="releases">
            <div className="flex items-center space-x-2 text-sm">
              <Music className="w-8 h-8" strokeWidth={0.5} />
              <h3 className="font-medium text-gray-900">latest releases</h3>
            </div>
            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
              {releases.map((release, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <img
                    src={release.image}
                    alt={release.title}
                    className="w-10 h-10 rounded object-cover"
                  />
                  <div>
                    <p className="text-gray-900 text-sm">{release.title}</p>
                    <p className="text-gray-600 text-xs">{release.artist}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4" id="events">
            <div className="flex items-center space-x-2 text-sm">
              <Calendar className="w-8 h-8" strokeWidth={0.5} />
              <h3 className="font-medium text-gray-900">upcoming events</h3>
            </div>
            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
              {events.map((event, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-10 h-10 rounded object-cover"
                  />
                  <div>
                    <p className="text-gray-900 text-sm">{event.title}</p>
                    <div className="flex items-center text-gray-600 text-xs">
                      <span>{event.location}</span>
                      <span className="mx-1">•</span>
                      <span>{event.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4" id="threads">
            <div className="flex items-center space-x-2 text-sm">
              <MessageCircle className="w-8 h-8" strokeWidth={0.5} />
              <h3 className="font-medium text-gray-900">your threads</h3>
            </div>
            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
              {threads.map((thread, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <img
                    src={thread.image}
                    alt={thread.author}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-gray-900 text-sm">{thread.title}</p>
                    <div className="flex items-center text-gray-600 text-xs">
                      <span>{thread.author}</span>
                      <span className="mx-1">•</span>
                      <span>{thread.replies} replies</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}