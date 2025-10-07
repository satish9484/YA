import { useContext } from 'react';

import { theme as antdTheme } from 'antd';

import { ThemeContext } from './theme.ts';

// Enhanced useTheme hook with direct token access
export const useUnifiedTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useUnifiedTheme must be used within a UnifiedThemeProvider');
    }

    const { token } = antdTheme.useToken();

    return {
        ...context, // theme, setTheme
        isDarkMode: context.theme === 'dark',
        token, // Direct access to Ant Design tokens
        // Convenience methods
        getColor: (colorKey: string) => token[colorKey as keyof typeof token],
        getSpacing: (size: number) => token.marginLG * size,
        getBorderRadius: (size: 'small' | 'medium' | 'large' = 'medium') => {
            const sizes = {
                small: token.borderRadiusSM,
                medium: token.borderRadius,
                large: token.borderRadiusLG,
            };
            return sizes[size];
        },
    };
};
