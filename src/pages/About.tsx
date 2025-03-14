import React from 'react';
import { Users, Globe, Sparkles } from 'lucide-react';

export function About() {
  return (
    <div className="space-y-12">
      <section className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">About Everything Everywhere</h1>
        <p className="text-xl text-gray-900 max-w-2xl mx-auto">
          LISTEN – LINK – TALK – WATCH
        </p>
      </section>

      <section className="bg-white p-8 rounded-lg shadow-lg border border-gray-200">
        <div className="max-w-3xl mx-auto text-gray-600 space-y-6 leading-relaxed">
          <p>
            At Everything Everywhere, we are driven by a deep love for music, culture, and meaningful experiences. Rooted in our backgrounds in music, technology, and events, we have lived the scene—working in record labels, creating and releasing music, and spending countless hours on dancefloors. We are passionate about craft, community, and conversation.
          </p>
          
          <p>
            Our mission is to create a space where music lovers can discover, engage, and contribute. A place to explore new sounds, share recommendations, and support artists and events that resonate with our shared cultural values. We believe in building a foundation for meaningful connections, where conversations around music and experiences thrive.
          </p>
          
          <p>
            This platform is one we actively use—we buy music, list events, and take recommendations with open ears and an open mind. Our goal is to curate a welcoming, inclusive space that not only delivers music tailored to your tastes but also introduces you to like-minded individuals who can expand your perspective.
          </p>
          
          <p>
            With curiosity, respect, and a commitment to cultural enrichment, we move forward.
          </p>
          
          <p className="font-medium mt-8">
            Be kind. Stay open.
          </p>
          
          <p className="font-bold text-gray-900">
            Everything Everywhere
          </p>
        </div>
      </section>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="p-6 bg-white rounded-lg shadow-lg border border-gray-200">
          <Users className="w-8 h-8 mb-4 text-blue-600" />
          <h2 className="text-xl font-semibold mb-2 text-gray-900">Our Community</h2>
          <p className="text-gray-600">
            Join thousands of members who share your passion for music, culture, and events.
            Our diverse community brings together people from all walks of life.
          </p>
        </div>

        <div className="p-6 bg-white rounded-lg shadow-lg border border-gray-200">
          <Globe className="w-8 h-8 mb-4 text-green-600" />
          <h2 className="text-xl font-semibold mb-2 text-gray-900">Global Reach</h2>
          <p className="text-gray-600">
            Connect with music lovers and event enthusiasts from around the world.
            Share experiences and discover new sounds and perspectives.
          </p>
        </div>

        <div className="p-6 bg-white rounded-lg shadow-lg border border-gray-200">
          <Sparkles className="w-8 h-8 mb-4 text-purple-600" />
          <h2 className="text-xl font-semibold mb-2 text-gray-900">Our Mission</h2>
          <p className="text-gray-600">
            To create a space where music and culture flourish, where recommendations lead to discoveries,
            and where every event enriches our collective experience.
          </p>
        </div>
      </div>
    </div>
  );
}