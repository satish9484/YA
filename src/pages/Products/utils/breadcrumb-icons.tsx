import type React from 'react';

import { AudioOutlined, HomeOutlined, ShoppingOutlined, SoundOutlined } from '@ant-design/icons';

/**
 * Breadcrumb icons for Products pages
 * Centralized icon definitions for consistent breadcrumb appearance
 */

export const BREADCRUMB_ICONS = {
    home: <HomeOutlined />,
    products: <ShoppingOutlined />,
    'line-array': <SoundOutlined />,
    processors: <AudioOutlined />,
    amplifiers: <AudioOutlined />,
    subwoofers: <SoundOutlined />,
    monitors: <SoundOutlined />,
} as const;

export const getBreadcrumbIcon = (key: string): React.ReactNode => {
    return BREADCRUMB_ICONS[key as keyof typeof BREADCRUMB_ICONS] || <AudioOutlined />;
};
