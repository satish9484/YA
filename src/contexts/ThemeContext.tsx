import { type ReactNode, useCallback, useEffect, useState } from 'react';

import { ConfigProvider } from 'antd';

import { createAppTheme } from './antDesignThemeConfig';
import { type Theme, ThemeContext } from './theme.ts';

interface ThemeProviderProps {
    children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    const [theme, setThemeState] = useState<Theme>(() => {
        const savedTheme = localStorage.getItem('theme') as Theme | null;
        return savedTheme ?? 'system';
    });

    const applyTheme = useCallback((selectedTheme: Theme) => {
        let effectiveTheme: 'light' | 'dark';

        if (selectedTheme === 'system') {
            effectiveTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
                ? 'dark'
                : 'light';
        } else {
            effectiveTheme = selectedTheme;
        }

        // Apply theme immediately to prevent FOUC (Flash of Unstyled Content)
        document.documentElement.setAttribute('data-theme', effectiveTheme);

        // Force a reflow to ensure the theme is applied
        // document.documentElement.offsetHeight;
    }, []);

    // Apply theme immediately on mount and when theme changes
    useEffect(() => {
        applyTheme(theme);
    }, [theme, applyTheme]);

    // Apply theme immediately on component mount to prevent styling issues during navigation
    useEffect(() => {
        // Get the current theme from localStorage or default to system
        const currentTheme = (localStorage.getItem('theme') as Theme | null) ?? 'system';
        applyTheme(currentTheme);
    }, [applyTheme]);

    // Listen for system theme changes when 'system' theme is active
    useEffect(() => {
        if (theme !== 'system') return;

        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleSystemChange = (_e: MediaQueryListEvent) => {
            applyTheme('system');
        };

        mediaQuery.addEventListener('change', handleSystemChange);
        return () => mediaQuery.removeEventListener('change', handleSystemChange);
    }, [theme, applyTheme]);

    // Sync theme with localStorage changes (e.g., from other tabs)
    useEffect(() => {
        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === 'theme' && e.newValue) {
                const newTheme = e.newValue as Theme;
                setThemeState(newTheme);
                applyTheme(newTheme);
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, [applyTheme]);

    const setTheme = (newTheme: Theme) => {
        setThemeState(newTheme);
        localStorage.setItem('theme', newTheme);
    };

    // Create Ant Design theme configuration
    const antdThemeConfig = createAppTheme(theme === 'dark');

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            <ConfigProvider theme={antdThemeConfig}>{children}</ConfigProvider>
        </ThemeContext.Provider>
    );
};
