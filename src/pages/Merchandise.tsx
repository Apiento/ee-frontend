import React, { useState } from 'react';
import { ShoppingBag, Search, Filter } from 'lucide-react';
import { mockLabels } from '../data/store';
import type { Merchandise } from '../types/store';

export function MerchandisePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'clothing' | 'accessories' | 'prints' | 'other'>('all');
  const [selectedMerch, setSelectedMerch] = useState<Merchandise | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<{size?: string; color?: string} | null>(null);

  // Collect all merchandise from all labels
  const allMerchandise = mockLabels.flatMap(label => 
    label.merchandise.map(merch => ({
      ...merch,
      labelName: label.name,
      labelId: label.id
    }))
  );

  const filteredMerchandise = allMerchandise.filter(merch => {
    const matchesSearch = merch.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         merch.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         merch.labelName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || merch.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="heading-lg text-gray-900 mb-2">Merchandise</h1>
          <p className="text-body text-gray-600">Support your favorite labels with official merchandise</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Filters */}
        <div className="md:w-64 shrink-0 space-y-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search merchandise..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input w-full pl-10"
            />
          </div>

          <div className="space-y-2">
            <h2 className="text-sm font-medium text-gray-900 mb-3">Categories</h2>
            <button
              onClick={() => setSelectedCategory('all')}
              className={`w-full px-4 py-2 rounded-lg text-sm font-medium transition-colors text-left ${
                selectedCategory === 'all'
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              All Items
            </button>
            {(['clothing', 'accessories', 'prints', 'other'] as const).map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`w-full px-4 py-2 rounded-lg text-sm font-medium transition-colors text-left ${
                  selectedCategory === category
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Merchandise Grid */}
        <div className="flex-1">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMerchandise.map(merch => (
              <div key={merch.id} className="card">
                <div className="aspect-square relative">
                  <img
                    src={merch.image}
                    alt={merch.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <div className="text-sm text-gray-500 mb-1">{merch.labelName}</div>
                  <h3 className="text-lg font-display font-medium text-gray-900 mb-1">
                    {merch.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">{merch.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-900 font-medium">
                      ${merch.price.toFixed(2)}
                    </span>
                    <button
                      onClick={() => {
                        setSelectedMerch(merch);
                        setSelectedVariant(null);
                      }}
                      className="button-primary flex items-center space-x-2"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Merchandise Modal */}
      {selectedMerch && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6 space-y-4">
            <div className="flex justify-between items-start">
              <h3 className="text-xl font-semibold text-gray-900">{selectedMerch.title}</h3>
              <button
                onClick={() => setSelectedMerch(null)}
                className="text-gray-400 hover:text-gray-500"
              >
                <Filter className="w-5 h-5" />
              </button>
            </div>
            
            <img
              src={selectedMerch.image}
              alt={selectedMerch.title}
              className="w-full aspect-square object-cover rounded-lg"
            />
            
            <p className="text-gray-600">{selectedMerch.description}</p>
            
            {selectedMerch.variants && (
              <div className="space-y-4">
                {selectedMerch.variants[0].size && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Size</label>
                    <div className="grid grid-cols-4 gap-2">
                      {Array.from(new Set(selectedMerch.variants.map(v => v.size))).map(size => (
                        <button
                          key={size}
                          onClick={() => setSelectedVariant(v => ({ ...v, size }))}
                          className={`px-4 py-2 text-sm font-medium rounded-lg ${
                            selectedVariant?.size === size
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                
                {selectedMerch.variants[0].color && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
                    <div className="grid grid-cols-4 gap-2">
                      {Array.from(new Set(selectedMerch.variants.map(v => v.color))).map(color => (
                        <button
                          key={color}
                          onClick={() => setSelectedVariant(v => ({ ...v, color }))}
                          className={`px-4 py-2 text-sm font-medium rounded-lg ${
                            selectedVariant?.color === color
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                          }`}
                        >
                          {color}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
            
            <div className="flex items-center justify-between pt-4">
              <span className="text-xl font-semibold text-gray-900">
                ${selectedMerch.price.toFixed(2)}
              </span>
              <button
                onClick={() => {
                  // Add to cart logic here
                  setSelectedMerch(null);
                }}
                className="button-primary"
                disabled={selectedMerch.variants && !selectedVariant}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}