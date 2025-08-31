import type React from 'react';

import { useTheme } from '../hooks/useTheme';
import { APP_NAME } from './constants';

interface LogoProps {
    width?: number | string;
    height?: number | string;
    className?: string;
    style?: React.CSSProperties;
    variant?: 'svg' | 'image';
    showBackground?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
    width = 200,
    height = 200,
    className = '',
    style = {},
    variant = 'svg',
    showBackground = false,
}) => {
    const { theme } = useTheme();

    // Theme-aware logo images
    if (variant === 'image') {
        const logoSrc =
            theme === 'dark' ? '/logo/dark-theam-logo.png' : '/logo/light-theam-logo.png';

        const containerStyle: React.CSSProperties = {
            display: 'inline-block',
            padding: showBackground ? '8px' : '0',
            borderRadius: showBackground ? '12px' : '0',
            overflow: showBackground ? 'hidden' : 'visible',
            transition: 'all 0.3s ease',
            ...style,
        };

        const imageStyle: React.CSSProperties = {
            display: 'block',
            borderRadius: showBackground ? '8px' : '0',
        };

        return (
            <div style={containerStyle} className={className}>
                <img
                    src={logoSrc}
                    alt={`${APP_NAME} Logo`}
                    width={width}
                    height={height}
                    style={imageStyle}
                />
            </div>
        );
    }

    // SVG logo (default)
    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            style={style}
            fontFamily="sans-serif"
        >
            <defs>
                <linearGradient id="gradientA" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" style={{ stopColor: '#003366', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: '#00AEEF', stopOpacity: 1 }} />
                </linearGradient>
            </defs>

            <rect x="10" y="10" width="180" height="180" rx="30" ry="30" fill="transparent" />

            <path
                d="M 40 50 L 70 90 L 70 150 M 100 50 L 70 90"
                stroke="#000000"
                strokeWidth="25"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
            />

            <path
                d="M 110 150 L 135 50 L 160 150 M 122 120 L 148 120"
                stroke="#003366"
                strokeWidth="25"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

// Export a default version for backward compatibility
export default Logo;
