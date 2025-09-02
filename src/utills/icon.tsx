import type React from 'react';

import { useTheme } from '../hooks/useTheme';
import { APP_NAME } from './constants';

// Logo path constants
const LOGO_PATHS = {
    // Main logos
    MAIN_LOGO: '/logo/_Main Logo.png',
    MAIN_SQUARE_LOGO: '/logo/_Main square logo.png',
    TRANSPARENT_LOGO: '/logo/_Transparent logo.png',

    // Android icons
    ANDROID: {
        MDPI: '/logo/AppIcons/android/mipmap-mdpi/ic_launcher.png',
        HDPI: '/logo/AppIcons/android/mipmap-hdpi/ic_launcher.png',
        XHDPI: '/logo/AppIcons/android/mipmap-xhdpi/ic_launcher.png',
        XXHDPI: '/logo/AppIcons/android/mipmap-xxhdpi/ic_launcher.png',
        XXXHDPI: '/logo/AppIcons/android/mipmap-xxxhdpi/ic_launcher.png',
    },

    // iOS icons
    IOS: {
        SIZE_16: '/logo/AppIcons/Assets.xcassets/AppIcon.appiconset/_/16.png',
        SIZE_32: '/logo/AppIcons/Assets.xcassets/AppIcon.appiconset/_/32.png',
        SIZE_64: '/logo/AppIcons/Assets.xcassets/AppIcon.appiconset/_/64.png',
        SIZE_128: '/logo/AppIcons/Assets.xcassets/AppIcon.appiconset/_/128.png',
        SIZE_256: '/logo/AppIcons/Assets.xcassets/AppIcon.appiconset/_/256.png',
        SIZE_512: '/logo/AppIcons/Assets.xcassets/AppIcon.appiconset/_/512.png',
        SIZE_1024: '/logo/AppIcons/Assets.xcassets/AppIcon.appiconset/_/1024.png',
    },

    // Alternative/Transparent icons
    TRANSPARENT: {
        APPSTORE: '/logo/tra_AppIcons/appstore.png',
        PLAYSTORE: '/logo/tra_AppIcons/playstore.png',
    },
} as const;

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

    // Device-specific logo images with responsive design
    if (variant === 'image') {
        // Get device pixel ratio for high DPI displays
        const pixelRatio = window.devicePixelRatio || 1;

        // Detect device type
        const isAndroid = /Android/i.test(navigator.userAgent);

        // Use the best available logo based on device, theme, and size
        const getLogoSrc = () => {
            const size = typeof width === 'number' ? width : 200;

            // For Android devices, use Android-specific icons
            if (isAndroid && size <= 192) {
                if (pixelRatio >= 3) return LOGO_PATHS.ANDROID.XXXHDPI;
                if (pixelRatio >= 2) return LOGO_PATHS.ANDROID.XXHDPI;
                if (pixelRatio >= 1.5) return LOGO_PATHS.ANDROID.XHDPI;
                if (pixelRatio >= 1) return LOGO_PATHS.ANDROID.HDPI;
                return LOGO_PATHS.ANDROID.MDPI;
            }

            // For very small sizes (favicon, mobile icons)
            if (size <= 32) {
                if (pixelRatio >= 3) return LOGO_PATHS.IOS.SIZE_32;
                if (pixelRatio >= 2) return LOGO_PATHS.IOS.SIZE_32;
                return LOGO_PATHS.IOS.SIZE_16;
            }

            // For small sizes (mobile app icons)
            if (size <= 64) {
                if (pixelRatio >= 3) return LOGO_PATHS.IOS.SIZE_64;
                if (pixelRatio >= 2) return LOGO_PATHS.IOS.SIZE_64;
                return LOGO_PATHS.IOS.SIZE_32;
            }

            // For medium sizes (tablet, desktop icons)
            if (size <= 128) {
                if (pixelRatio >= 3) return LOGO_PATHS.IOS.SIZE_128;
                if (pixelRatio >= 2) return LOGO_PATHS.IOS.SIZE_128;
                return LOGO_PATHS.IOS.SIZE_64;
            }

            // For large sizes (desktop, high-res displays)
            if (size <= 256) {
                if (pixelRatio >= 3) return LOGO_PATHS.IOS.SIZE_256;
                if (pixelRatio >= 2) return LOGO_PATHS.IOS.SIZE_256;
                return LOGO_PATHS.IOS.SIZE_128;
            }

            // For very large sizes (banners, headers)
            if (size <= 512) {
                if (pixelRatio >= 3) return LOGO_PATHS.IOS.SIZE_512;
                if (pixelRatio >= 2) return LOGO_PATHS.IOS.SIZE_512;
                return LOGO_PATHS.IOS.SIZE_256;
            }

            // For extra large sizes (full-screen, presentations)
            if (pixelRatio >= 3) return LOGO_PATHS.IOS.SIZE_1024;
            if (pixelRatio >= 2) return LOGO_PATHS.IOS.SIZE_1024;
            return LOGO_PATHS.IOS.SIZE_512;
        };

        const logoSrc = getLogoSrc();

        const containerStyle: React.CSSProperties = {
            display: 'inline-block',
            padding: showBackground ? '8px' : '0',
            borderRadius: showBackground ? '12px' : '0',
            overflow: showBackground ? 'hidden' : 'visible',
            transition: 'all 0.3s ease',
            position: 'relative',
            ...style,
        };

        const imageStyle: React.CSSProperties = {
            display: 'block',
            borderRadius: showBackground ? '8px' : '0',
            maxWidth: '100%',
            height: 'auto',
            objectFit: 'contain',
            filter: theme === 'dark' ? 'brightness(1.1) contrast(1.1)' : 'none',
            transition: 'filter 0.3s ease, transform 0.3s ease',
        };

        // Get fallback logo based on size
        const getFallbackLogoSrc = (size: number) => {
            if (size <= 32) return LOGO_PATHS.IOS.SIZE_16;
            if (size <= 64) return LOGO_PATHS.IOS.SIZE_32;
            if (size <= 128) return LOGO_PATHS.IOS.SIZE_64;
            if (size <= 256) return LOGO_PATHS.IOS.SIZE_128;
            if (size <= 512) return LOGO_PATHS.IOS.SIZE_256;
            return LOGO_PATHS.IOS.SIZE_512;
        };

        return (
            <div style={containerStyle} className={`responsive-logo-container ${className}`}>
                <img
                    src={logoSrc}
                    alt={`${APP_NAME} Logo`}
                    width={width}
                    height={height}
                    style={imageStyle}
                    loading="lazy"
                    onError={e => {
                        // Fallback to appropriate size logo if current fails
                        const target = e.target as HTMLImageElement;
                        const size = typeof width === 'number' ? width : 200;
                        target.src = getFallbackLogoSrc(size);
                    }}
                />
            </div>
        );
    }

    // Theme-adaptive SVG logo
    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
            className={`theme-adaptive-logo ${className}`}
            style={
                {
                    '--logo-primary': theme === 'dark' ? '#ffffff' : '#862626',
                    '--logo-secondary': theme === 'dark' ? '#f0f0f0' : '#523b3b',
                    '--logo-accent': theme === 'dark' ? '#ff6b6b' : '#ff4757',
                    ...style,
                } as React.CSSProperties
            }
            fontFamily="sans-serif"
        >
            <defs>
                <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop
                        offset="0%"
                        style={{ stopColor: 'var(--logo-primary)', stopOpacity: 1 }}
                    />
                    <stop
                        offset="100%"
                        style={{ stopColor: 'var(--logo-secondary)', stopOpacity: 1 }}
                    />
                </linearGradient>
                <linearGradient id="accentGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" style={{ stopColor: 'var(--logo-accent)', stopOpacity: 1 }} />
                    <stop
                        offset="100%"
                        style={{ stopColor: 'var(--logo-primary)', stopOpacity: 0.8 }}
                    />
                </linearGradient>
            </defs>

            {/* Background circle with theme-adaptive color */}
            <circle
                cx="100"
                cy="100"
                r="90"
                fill={theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(134,38,38,0.1)'}
                stroke="var(--logo-primary)"
                strokeWidth="2"
            />

            {/* Main "OA" design - "O" */}
            <circle
                cx="70"
                cy="100"
                r="25"
                fill="none"
                stroke="url(#logoGradient)"
                strokeWidth="8"
                strokeLinecap="round"
            />

            {/* Main "OA" design - "A" */}
            <path
                d="M 120 130 L 140 80 L 160 130 M 125 115 L 155 115"
                stroke="url(#logoGradient)"
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
            />

            {/* Accent elements */}
            <circle cx="100" cy="50" r="3" fill="url(#accentGradient)" />
            <circle cx="100" cy="150" r="3" fill="url(#accentGradient)" />
        </svg>
    );
};

// Export a default version for backward compatibility
export default Logo;
