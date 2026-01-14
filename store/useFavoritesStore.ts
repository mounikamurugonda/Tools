import { create } from 'zustand';

interface FavoritesState {
    favorites: string[];
    isLoading: boolean;
    initialized: boolean;
    fetchFavorites: () => Promise<void>;
    toggleFavorite: (toolId: string) => Promise<void>;
    isFavorite: (toolId: string) => boolean;
}

export const useFavoritesStore = create<FavoritesState>((set, get) => ({
    favorites: [],
    isLoading: false,
    initialized: false,

    fetchFavorites: async () => {
        set({ isLoading: true });
        try {
            const res = await fetch('/api/favorites');
            if (res.ok) {
                const data = await res.json();
                set({ favorites: data.favorites || [], initialized: true });
            } else {
                // If unauthorized/error, just set empty but marked initialized
                set({ favorites: [], initialized: true });
            }
        } catch (error) {
            console.error('Error fetching favorites:', error);
            set({ favorites: [], initialized: true });
        } finally {
            set({ isLoading: false });
        }
    },

    toggleFavorite: async (toolId: string) => {
        const { favorites } = get();
        const isFav = favorites.includes(toolId);
        const action = isFav ? 'remove' : 'add';

        // Optimistic Update
        if (isFav) {
            set({ favorites: favorites.filter(id => id !== toolId) });
        } else {
            set({ favorites: [...favorites, toolId] });
        }

        try {
            const res = await fetch('/api/favorites', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ toolId, action }),
            });

            if (!res.ok) {
                throw new Error('Failed to update favorite');
            }
        } catch (error) {
            console.error('Error toggling favorite:', error);
            // Revert optimism
            if (isFav) {
                set({ favorites: [...favorites, toolId] }); // Add back
            } else {
                set({ favorites: favorites.filter(id => id !== toolId) }); // Remove
            }
        }
    },

    isFavorite: (toolId) => {
        return get().favorites.includes(toolId);
    }
}));
