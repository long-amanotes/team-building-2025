import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Theme = 'light' | 'dark';

interface ThemeState {
    theme: Theme;
    toggleTheme: () => void;
    setTheme: (theme: Theme) => void;
}

export const useThemeStore = create<ThemeState>()(
    persist(
        (set, get) => ({
            theme: 'light',
            toggleTheme: () => {
                const newTheme = get().theme === 'light' ? 'dark' : 'light';
                set({ theme: newTheme });
                document.documentElement.classList.remove('light', 'dark');
                document.documentElement.classList.add(newTheme);
            },
            setTheme: (theme: Theme) => {
                set({ theme });
                document.documentElement.classList.remove('light', 'dark');
                document.documentElement.classList.add(theme);
            },
        }),
        {
            name: 'ngd-theme',
            onRehydrateStorage: () => (state) => {
                if (state) {
                    document.documentElement.classList.add(state.theme);
                }
            },
        }
    )
);
