import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Match } from '@/types/match';

interface FavoritesState {
  favorites: Match[];
  showFavorites: boolean;
  toggleFavorites: () => void;
  toggleFavorite: (match: Match) => void;
  clearFavorites: () => void;
}

export const useFavorites = create<FavoritesState>()(
  persist(
    (set) => ({
      favorites: [],
      showFavorites: true,
      toggleFavorites: () => set((state) => ({ showFavorites: !state.showFavorites })),
      toggleFavorite: (match) => set((state) => {
        const isFavorite = state.favorites.some(m => m.id === match.id);
        if (isFavorite) {
          return { favorites: state.favorites.filter(m => m.id !== match.id) };
        }
        return { favorites: [...state.favorites, match] };
      }),
      clearFavorites: () => set({ favorites: [] }),
    }),
    {
      name: 'favorites-storage',
    }
  )
); 