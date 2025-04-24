import React, {useState} from 'react';
import {Link, Outlet, useNavigate} from 'react-router-dom';
import { MessageSquare, Store, Calendar, User, Search, Users } from 'lucide-react';
import {RadioPlayer} from './RadioPlayer';
import {MusicPlayer} from './MusicPlayer';
import logo from './../public/img/Everything_Everywhere_Logo_White.png';

export function Layout() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/forum?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col">
      <RadioPlayer />
      <nav className="bg-gray-100 sticky top-0 z-50">
        <div id="nav" className="max-w-[1920px] mx-auto px-6">
          <div className="flex items-center justify-between h-18">
            <div id="home" className="flex items-center">
              <Link to="/" className="font-display tracking-tight">
                <img src={logo} alt="logo" height={250} width={250} />
              </Link>
            </div>
            
            <div id="search" className="hidden md:flex flex-1 justify-center px-8">
              <form onSubmit={handleSearch} className="w-full max-w-lg">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-white text-gray-900 rounded-full pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900 border border-gray-200"
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-500" />
                  </div>
                </div>
              </form>
            </div>
            
            <div id="menu" className="hidden md:flex items-center space-x-8">
              <Link to="/forum" className="font-extrabold tracking-tight flex items-center">
                <MessageSquare className="w-6 h-6 mr-2" strokeWidth={0.8} />
                FORUM
              </Link>
              <Link to="/store" className="font-extrabold tracking-tight flex items-center">
                <Store className="w-6 h-6 mr-2" strokeWidth={0.8} />
                STORE
              </Link>
              <Link to="/events" className="font-extrabold tracking-tight flex items-center">
                <Calendar className="w-6 h-6 mr-2" strokeWidth={0.8} />
                EVENTS
              </Link>
              <Link to="/community" className="font-extrabold tracking-tight flex items-center">
                <Users className="w-6 h-6 mr-2" strokeWidth={0.8} />
                COMMUNITY
              </Link>
              <Link to="/profile" className="font-extrabold tracking-tight">
                <User className="w-8 h-8" strokeWidth={0.5} />
              </Link>
            </div>

            <div className="md:hidden flex items-center space-x-4">
              <button
                onClick={handleSearch}
                className="p-2 text-gray-600 hover:text-gray-900"
              >
                <Search className="w-6 h-6" />
              </button>
              <Link to="/profile" className="text-gray-600 hover:text-gray-900">
                <User className="w-6 h-6" />
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-1 max-w-[1920px] mx-auto w-full">
        <Outlet />
      </main>

      <MusicPlayer />

      <footer className="bg-gray-100 border-t border-gray-200">
        <div className="max-w-[1920px] mx-auto px-6 py-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <h3 className="font-display text-lg font-semibold text-gray-900 mb-6">About</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                The culture we believe in builds foundations.
              </p>
              <Link to="/about" className="text-blue-600 hover:text-blue-700 text-sm mt-4 inline-block">
                Learn more
              </Link>
            </div>
            <div>
              <h3 className="font-display text-lg font-semibold text-gray-900 mb-6">Quick Links</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/forum" className="text-gray-600 hover:text-gray-900 text-sm">Forum</Link>
                </li>
                <li>
                  <Link to="/store" className="text-gray-600 hover:text-gray-900 text-sm">Store</Link>
                </li>
                <li>
                  <Link to="/events" className="text-gray-600 hover:text-gray-900 text-sm">Events</Link>
                </li>
                <li>
                  <Link to="/community" className="text-gray-600 hover:text-gray-900 text-sm">Community</Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-display text-lg font-semibold text-gray-900 mb-6">Connect</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                Join our community and stay updated with the latest releases, events, and discussions.
              </p>
              <div className="text-sm text-gray-500">
                © 2024 Everything Everywhere. All rights reserved.
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}