import React, {useState} from 'react';
import {Link, Outlet, useNavigate} from 'react-router-dom';
import { MessageSquare, Store, Calendar, User, Search, Users } from 'lucide-react';
import {RadioPlayer} from './RadioPlayer';
import {MusicPlayer} from './MusicPlayer';

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
      <nav className="bg-gray-100 sticky top-0 z-40">
        <div id="nav" className="max-w-[1920px] mx-auto px-6 lg:py-4">
          <div className="flex items-center justify-between h-18">
            <div id="home" className="flex items-center">
              <Link to="/" className="font-display tracking-tight">
                <h1 className="max-sm:text-3xl max-sm:leading-5 lg:text-4xl lg:leading-5 tracking-tight mt-2.5">EVERYTHING</h1>
                <h1 className="max-sm:text-3xl lg:text-4xl tracking-tight">EVERYWHERE</h1>
              </Link>
            </div>
            
            <div id="search" className="hidden md:flex flex-1 justify-end float-right">
              <form onSubmit={handleSearch} className="w-full max-w-md">
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
              <h3 className="font-display text-lg font-semibold text-gray-900 mb-6">ABOUT</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                The culture we believe in builds foundations.
              </p>
              <Link to="/about" className="text-blue-600 hover:text-blue-700 text-sm mt-4 inline-block">
                Learn more
              </Link>
            </div>
            <div>
              <h3 className="font-display text-lg font-semibold text-gray-900 mb-6">QUICK LINKS</h3>
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
              <h3 className="font-display text-lg font-semibold text-gray-900 mb-6">CONNECT</h3>
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