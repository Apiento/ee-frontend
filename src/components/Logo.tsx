import React from 'react';
import { Link } from 'react-router-dom';

export function Logo() {
  return (
    <Link to="/" className="flex items-center space-x-2 text-white hover:text-white">
      <img 
        src="/logo.svg" 
        alt="Everything Everywhere" 
        className="h-8 w-auto"
      />
      <span className="text-xl font-bold">Everything Everywhere</span>
    </Link>
  );
}