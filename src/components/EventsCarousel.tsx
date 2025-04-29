import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import { format, parseISO } from 'date-fns';

// Featured events data
const featuredEvents = [
  {
    id: '1',
    title: 'Electronic Music Festival',
    date: '2024-03-15',
    location: 'Amsterdam, Netherlands',
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=1200&q=80',
    description: 'A three-day festival featuring the best in electronic music'
  },
  {
    id: '2',
    title: 'Modular Synthesis Workshop',
    date: '2024-03-20',
    location: 'Berlin, Germany',
    image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1200&q=80',
    description: 'Learn the basics of modular synthesis with industry experts'
  },
  {
    id: '3',
    title: 'Sound Installations Exhibition',
    date: '2024-03-25',
    location: 'London, UK',
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=1200&q=80',
    description: 'An immersive exhibition of sound art and installations'
  }
];

export function EventsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-rotate every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((current) => (current + 1) % featuredEvents.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent link navigation when clicking navigation buttons
    setCurrentIndex((current) => (current + 1) % featuredEvents.length);
  };

  const prevSlide = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent link navigation when clicking navigation buttons
    setCurrentIndex((current) => 
      current === 0 ? featuredEvents.length - 1 : current - 1
    );
  };

  const selectSlide = (e: React.MouseEvent, index: number) => {
    e.preventDefault(); // Prevent link navigation when clicking dots
    setCurrentIndex(index);
  };

  return (
    <div className="relative h-[400px] mb-8 rounded-lg overflow-hidden group m-6">
      {/* Carousel slides */}
      <div className="relative h-full">
        {featuredEvents.map((event, index) => (
          <Link
            key={event.id}
            to={`/events`}
            state={{ selectedEvent: event.id }}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === currentIndex ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            <div className="relative h-full">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h2 className="text-3xl font-display font-bold text-white mb-2">
                  {event.title}
                </h2>
                <p className="text-white/90 text-lg mb-4">{event.description}</p>
                <div className="flex items-center space-x-4 text-white/80">
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 mr-2" />
                    <span>{format(parseISO(event.date), 'MMMM d, yyyy')}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 mr-2" />
                    <span>{event.location}</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Navigation buttons - only visible on hover or focus */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {featuredEvents.map((_, index) => (
          <button
            key={index}
            onClick={(e) => selectSlide(e, index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
}