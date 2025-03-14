import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Release } from '../types/store';

interface CartItem extends Release {
  quantity?: number;
}

interface CartStore {
  items: CartItem[];
  addToCart: (item: Release) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  total: number;
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addToCart: (item) => set((state) => {
        const existingItem = state.items.find((i) => i.id === item.id);
        if (existingItem) {
          return {
            items: state.items.map((i) =>
              i.id === item.id
                ? { ...i, quantity: (i.quantity || 1) + 1 }
                : i
            ),
          };
        }
        return { items: [...state.items, { ...item, quantity: 1 }] };
      }),
      removeFromCart: (id) =>
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
        })),
      updateQuantity: (id, quantity) =>
        set((state) => ({
          items: quantity === 0
            ? state.items.filter((i) => i.id !== id)
            : state.items.map((i) =>
                i.id === id ? { ...i, quantity } : i
              ),
        })),
      get total() {
        return get().items.reduce(
          (sum, item) => sum + item.price * (item.quantity || 1),
          0
        );
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);