import { create } from 'zustand';
import { persist } from 'zustand/middleware';
const initialState = {
    theme: 'light',
};
export const useThemeStore = create()(persist((set, _) => ({
    ...initialState,
    setTheme: (theme) => set({ theme }),
    toggleTheme: () => set(state => ({
        theme: state.theme === 'light' ? 'dark' : 'light',
    })),
    reset: () => set(initialState),
}), {
    name: 'theme-storage',
}));
