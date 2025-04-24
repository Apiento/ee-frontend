import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Globe, Calendar } from 'lucide-react';
import { Cart } from '../components/Cart';
import { useCart } from '../hooks/useCart';
import { mockLabels } from '../data/store';
import banner from "../public/img/EE_V1_Page_20_Image_0001.jpg";

export function Store() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { items } = useCart();

  return (
      <div>
        <img className="flex-1 max-w-[1920px] mx-auto w-full" src={banner} alt="banner" />
        <div className="space-y-12">
          <div className="flex justify-between items-center ml-6 mt-6">
            <div>
              <h1 className="heading-lg text-gray-900">RECORD LABELS</h1>
              <p className="text-body text-gray-600 ml-1">Discover and support independent music labels</p>
            </div>
            <button
              onClick={() => setIsCartOpen(true)}
              className="button-primary flex items-center"
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Cart ({items.length})
            </button>
          </div>

          {/* Labels Grid */}
          <div id="labels" className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ml-6">
            {mockLabels.map(label => (
              <Link
                key={label.id}
                to={`/store/label/${label.id}`}
                className="card group"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={label.logo}
                    alt={label.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="pt-6 pr-6 pb-6">
                  <h2 className="text-lg font-display font-semibold text-gray-900 mb-2">{label.name}</h2>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">{label.description}</p>
                  <div className="flex items-center text-sm text-gray-500 space-x-4">
                    <span className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" strokeWidth={0.5} />
                      {label.founded}
                    </span>
                    <span className="flex items-center">
                      <Globe className="w-4 h-4 mr-1" strokeWidth={0.5} />
                      {label.location}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </div>
    </div>
  );
}