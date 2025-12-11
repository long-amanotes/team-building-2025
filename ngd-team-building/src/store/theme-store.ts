import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Theme =
    | 'monokai-light'
    | 'monokai-pro'
    | 'monokai-machine'
    | 'monokai-octagon'
    | 'monokai-ristretto'
    | 'monokai-spectrum'
    | 'monokai-classic';

export interface ThemeInfo {
    id: Theme;
    name: string;
    colors: {
        background: string;
        primary: string;
        accent: string;
        foreground: string;
    };
    isDark: boolean;
}

export const THEMES: ThemeInfo[] = [
    {
        id: 'monokai-light',
        name: 'Light',
        colors: {
            background: '#faf9f7',
            primary: '#3b9da5',
            accent: '#8b7cf6',
            foreground: '#2d2a2e',
        },
        isDark: false,
    },
    {
        id: 'monokai-pro',
        name: 'Pro',
        colors: {
            background: '#2d2a2e',
            primary: '#78dce8',
            accent: '#ab9df2',
            foreground: '#fcfcfa',
        },
        isDark: true,
    },
    {
        id: 'monokai-machine',
        name: 'Machine',
        colors: {
            background: '#273136',
            primary: '#7cd5f1',
            accent: '#baa0f8',
            foreground: '#f2fffc',
        },
        isDark: true,
    },
    {
        id: 'monokai-octagon',
        name: 'Octagon',
        colors: {
            background: '#282a3a',
            primary: '#9cd1bb',
            accent: '#c39ac9',
            foreground: '#eaf2f1',
        },
        isDark: true,
    },
    {
        id: 'monokai-ristretto',
        name: 'Ristretto',
        colors: {
            background: '#2c211f',
            primary: '#85d4e1',
            accent: '#a89ec4',
            foreground: '#fff1e8',
        },
        isDark: true,
    },
    {
        id: 'monokai-spectrum',
        name: 'Spectrum',
        colors: {
            background: '#222222',
            primary: '#5ad4e6',
            accent: '#948ae3',
            foreground: '#f7f1ff',
        },
        isDark: true,
    },
    {
        id: 'monokai-classic',
        name: 'Classic',
        colors: {
            background: '#272822',
            primary: '#66d9ef',
            accent: '#ae81ff',
            foreground: '#f8f8f2',
        },
        isDark: true,
    },
];

const ALL_THEME_CLASSES = THEMES.map(t => t.id);

function applyThemeToDOM(theme: Theme) {
    const themeInfo = THEMES.find(t => t.id === theme);

    // Remove all theme classes first
    document.documentElement.classList.remove(...ALL_THEME_CLASSES, 'dark');

    // Add new theme class (except for light which uses :root)
    if (theme !== 'monokai-light') {
        document.documentElement.classList.add(theme);
    }

    // Add 'dark' class for dark themes (for Tailwind dark: variants)
    if (themeInfo?.isDark) {
        document.documentElement.classList.add('dark');
    }
}

interface ThemeState {
    theme: Theme;
    snowfallEnabled: boolean;
    setTheme: (theme: Theme) => void;
    setSnowfallEnabled: (enabled: boolean) => void;
    toggleSnowfall: () => void;
    getThemeInfo: () => ThemeInfo;
}

export const useThemeStore = create<ThemeState>()(
    persist(
        (set, get) => ({
            theme: 'monokai-light',
            snowfallEnabled: true,
            setTheme: (theme: Theme) => {
                set({ theme });
                applyThemeToDOM(theme);
            },
            setSnowfallEnabled: (enabled: boolean) => {
                set({ snowfallEnabled: enabled });
            },
            toggleSnowfall: () => {
                set((state) => ({ snowfallEnabled: !state.snowfallEnabled }));
            },
            getThemeInfo: () => {
                const currentTheme = get().theme;
                return THEMES.find(t => t.id === currentTheme) || THEMES[0];
            },
        }),
        {
            name: 'ngd-theme',
            onRehydrateStorage: () => (state) => {
                if (state) {
                    applyThemeToDOM(state.theme);
                }
            },
        }
    )
);
