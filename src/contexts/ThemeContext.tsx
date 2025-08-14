import { type ReactNode, useCallback, useEffect, useState } from 'react';

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

        document.documentElement.setAttribute('data-theme', effectiveTheme);
        document.body.setAttribute('data-theme', effectiveTheme);
    }, []);

    useEffect(() => {
        applyTheme(theme);
    }, [theme, applyTheme]);

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

    const setTheme = (newTheme: Theme) => {
        setThemeState(newTheme);
        localStorage.setItem('theme', newTheme);
    };

    return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
};
