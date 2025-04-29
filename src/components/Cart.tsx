import React from 'react';
import { X, ShoppingCart as CartIcon } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { Release } from '../types/store';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Cart({ isOpen, onClose }: CartProps) {
  const { items, removeFromCart, updateQuantity, total } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-display font-semibold text-gray-900 flex items-center">
            <CartIcon className="w-5 h-5 mr-2" />
            Shopping Cart
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-900">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-4 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 200px)' }}>
          {items.length === 0 ? (
            <p className="text-gray-500 text-center py-8">Your cart is empty</p>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex space-x-4 border-b border-gray-200 pb-4">
                <img
                  src={item.coverArt}
                  alt={item.title}
                  className="w-20 h-20 object-cover rounded-sm"
                />
                <div className="flex-1">
                  <h3 className="text-gray-900 font-medium">{item.title}</h3>
                  <p className="text-gray-500 text-sm">{item.artist}</p>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateQuantity(item.id, Math.max(0, (item.quantity || 1) - 1))}
                        className="text-gray-500 hover:text-gray-900 px-2 py-1 bg-gray-100 rounded-sm"
                      >
                        -
                      </button>
                      <span className="text-gray-900">{item.quantity || 1}</span>
                      <button
                        onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
                        className="text-gray-500 hover:text-gray-900 px-2 py-1 bg-gray-100 rounded-sm"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-600 hover:text-red-700 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <div className="text-gray-900 font-medium">
                  ${(item.price * (item.quantity || 1)).toFixed(2)}
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-gray-200 p-6">
            <div className="flex justify-between text-lg font-semibold text-gray-900 mb-4">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button className="w-full button-primary">
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}