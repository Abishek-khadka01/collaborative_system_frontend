import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Theme = 'light' | 'dark';

interface ThemeStoreState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  reset: () => void;
}

const initialState = {
  theme: 'light' as Theme,
};

export const useThemeStore = create<ThemeStoreState>()(
  persist(
    (set, _) => ({
      ...initialState,
      setTheme: (theme: Theme) => set({ theme }),
      toggleTheme: () =>
        set(state => ({
          theme: state.theme === 'light' ? 'dark' : 'light',
        })),
      reset: () => set(initialState),
    }),
    {
      name: 'theme-storage',
    }
  )
);
