import type React from 'react';
import { type ReactNode, useCallback, useEffect, useState } from 'react';

import { theme as antdTheme, ConfigProvider } from 'antd';

import { type Theme, ThemeContext } from './theme.ts';

interface ThemeProviderProps {
    children: ReactNode;
}

// Unified theme configuration that replaces CSS variables
const createUnifiedTheme = (isDarkMode: boolean) => ({
    algorithm: isDarkMode ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
    token: {
        // === COLOR TOKENS ===
        // Primary colors - direct values based on theme
        colorPrimary: isDarkMode ? '#38bdf8' : '#0ea5e9',
        colorSuccess: isDarkMode ? '#4ade80' : '#22c55e',
        colorWarning: isDarkMode ? '#fbbf24' : '#f59e0b',
        colorError: isDarkMode ? '#f87171' : '#ef4444',
        colorInfo: isDarkMode ? '#60a5fa' : '#3b82f6',

        // Text colors - direct values
        colorText: isDarkMode ? '#f8fafc' : '#0f172a',
        colorTextSecondary: isDarkMode ? '#cbd5e1' : '#475569',
        colorTextTertiary: isDarkMode ? '#94a3b8' : '#64748b',
        colorTextQuaternary: isDarkMode ? '#64748b' : '#94a3b8',

        // Background colors - direct values
        colorBgLayout: isDarkMode ? '#0f172a' : '#f8fafc',
        colorBgContainer: isDarkMode ? '#1e293b' : '#ffffff',
        colorBgElevated: isDarkMode ? '#1e293b' : '#ffffff',
        colorBgSpotlight: isDarkMode ? '#334155' : '#f1f5f9',
        colorBgMask: 'rgba(0, 0, 0, 0.45)',

        // Border colors - direct values
        colorBorder: isDarkMode ? '#475569' : '#e2e8f0',
        colorBorderSecondary: isDarkMode ? '#334155' : '#f1f5f9',

        // Fill colors - direct values
        colorFill: isDarkMode ? '#334155' : '#f1f5f9',
        colorFillSecondary: isDarkMode ? '#475569' : '#e2e8f0',
        colorFillTertiary: isDarkMode ? '#64748b' : '#cbd5e1',
        colorFillQuaternary: isDarkMode ? '#64748b' : '#cbd5e1',

        // Link colors - direct values
        colorLink: isDarkMode ? '#38bdf8' : '#0ea5e9',
        colorLinkHover: isDarkMode ? '#7dd3fc' : '#0284c7',
        colorLinkActive: isDarkMode ? '#0ea5e9' : '#0369a1',

        // === TYPOGRAPHY ===
        fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        fontSize: 14,
        fontSizeHeading1: 38,
        fontSizeHeading2: 30,
        fontSizeHeading3: 24,
        fontSizeHeading4: 20,
        fontSizeHeading5: 16,
        lineHeight: 1.5714285714285714,
        lineHeightHeading1: 1.2105263157894737,
        lineHeightHeading2: 1.2666666666666666,
        lineHeightHeading3: 1.3333333333333333,
        lineHeightHeading4: 1.4,
        lineHeightHeading5: 1.5,

        // === SPACING ===
        padding: 16,
        paddingLG: 24,
        paddingSM: 12,
        paddingXS: 8,
        paddingXXS: 4,
        margin: 16,
        marginLG: 24,
        marginSM: 12,
        marginXS: 8,
        marginXXS: 4,

        // === MOTION ===
        motionDurationSlow: '0.3s',
        motionDurationMid: '0.2s',
        motionDurationFast: '0.1s',
        motionEaseInOut: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
        motionEaseOut: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
        motionEaseIn: 'cubic-bezier(0.55, 0.055, 0.675, 0.19)',

        // === BORDER RADIUS ===
        borderRadius: 6,
        borderRadiusLG: 8,
        borderRadiusSM: 4,
        borderRadiusXS: 2,

        // === SHADOWS ===
        boxShadow: isDarkMode
            ? '0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05)'
            : '0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05)',
        boxShadowSecondary: isDarkMode
            ? '0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05)'
            : '0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05)',

        // === Z-INDEX ===
        zIndexBase: 0,
        zIndexPopupBase: 1000,
    },
});

export const UnifiedThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
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

    // Create unified Ant Design theme configuration
    const antdThemeConfig = createUnifiedTheme(theme === 'dark');

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            <ConfigProvider theme={antdThemeConfig}>{children}</ConfigProvider>
        </ThemeContext.Provider>
    );
};
