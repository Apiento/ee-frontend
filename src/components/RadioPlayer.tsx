import React, { useState, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, ChevronDown } from 'lucide-react';

interface Stream {
  id: string;
  name: string;
  host: string;
  url: string;
}

const streams: Stream[] = [
  {
    id: '1',
    name: "APIENTO'S LIVE STREAM",
    host: 'Apiento',
    url: 'https://stream.radio.co/s5958f4b52/listen'
  },
  {
    id: '2',
    name: 'Late Night Frequencies',
    host: 'DJ Shadow',
    url: 'https://stream.radio.co/s5958f4b52/listen'
  },
  {
    id: '3',
    name: 'Ambient Waves',
    host: 'Brian Eno',
    url: 'https://stream.radio.co/s5958f4b52/listen'
  },
  {
    id: '4',
    name: 'Electronic Pulse',
    host: 'Four Tet',
    url: 'https://stream.radio.co/s5958f4b52/listen'
  }
];

export function RadioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedStream, setSelectedStream] = useState<Stream>(streams[0]);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const selectStream = (stream: Stream) => {
    setSelectedStream(stream);
    setShowDropdown(false);
    if (isPlaying && audioRef.current) {
      audioRef.current.src = stream.url;
      audioRef.current.play();
    }
  };

  return (
    <div className="bg-gradient-to-r from-gray-900 to-gray-800 border-b border-gray-800">
      <div className="max-w-[1920px] mx-auto px-6 py-4">
        <div className="flex items-center h-12">
          <div className="flex items-center space-x-4">
            <button
              onClick={togglePlay}
              className="p-1.5 rounded-full bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              {isPlaying ? (
                <Pause className="w-6 h-6 text-black" />
              ) : (
                <Play className="pl-1 w-6 h-6 text-black" />
              )}
            </button>

            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center text-left text-sm hover:text-blue-400 transition-colors"
              >
                <p className="text-white font-medium text-lg max-sm:font-display leading-5">{selectedStream.name}</p>
                <ChevronDown className="w-4 h-4 text-gray-400 ml-2" />
              </button>

              {showDropdown && (
                <div className="absolute top-full left-0 mt-1 w-64 bg-gray-800 rounded-lg shadow-lg border border-gray-700 py-1 z-50">
                  {streams.map((stream) => (
                    <button
                      key={stream.id}
                      onClick={() => selectStream(stream)}
                      className={`w-full px-4 py-2 text-left hover:bg-gray-700 ${
                        selectedStream.id === stream.id ? 'bg-gray-700' : ''
                      }`}
                    >
                      <p className="text-white font-medium">{stream.name}</p>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={toggleMute}
              className="p-2 text-gray-400 hover:text-white transition-colors"
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
            </button>
          </div>
          <audio
            ref={audioRef}
            src={selectedStream.url}
            preload="none"
          />
        </div>
      </div>
    </div>
  );
}