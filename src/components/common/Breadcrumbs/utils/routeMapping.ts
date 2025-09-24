import type { RouteMapping } from '../types/breadcrumbs.types';

/**
 * Route mapping configuration
 * Maps router names to actual route paths based on routes.tsx
 */
export const ROUTE_MAPPING: RouteMapping = {
    // Landing pages
    landing: '/',
    home: '/',

    // Products
    products: '/products',
    'line-array': '/products/line-array',
    monitors: '/products/monitors',
    subwoofers: '/products/subwoofers',
    amplifiers: '/products/amplifiers',
    processors: '/products/processors',

    // Product details
    'toa-hx5b': '/products/toa-hx5b',
    'line-array-detail': '/products/line-array',

    // Applications
    applications: '/applications',
    'live-sound': '/applications/live-sound',
    corporate: '/applications/corporate',
    worship: '/applications/worship',
    entertainment: '/applications/entertainment',
    outdoor: '/applications/outdoor',

    // Other pages
    about: '/about',
    contact: '/contact',
    dashboard: '/dashboard',
    admin: '/admin',
    'admin-dashboard': '/admin/dashboard',
} as const;

/**
 * Get the actual route path for a given router name
 * @param routerName - The router name to look up
 * @returns The corresponding route path or undefined if not found
 */
export const getRoutePath = (routerName: string): string | undefined => {
    return ROUTE_MAPPING[routerName];
};

/**
 * Check if a router name exists in the route mapping
 * @param routerName - The router name to check
 * @returns True if the router name exists, false otherwise
 */
export const hasRoute = (routerName: string): boolean => {
    return routerName in ROUTE_MAPPING;
};

/**
 * Get all available router names
 * @returns Array of all available router names
 */
export const getAllRouterNames = (): string[] => {
    return Object.keys(ROUTE_MAPPING);
};

/**
 * Get route mapping for a specific category
 * @param category - The category to filter by (e.g., 'products', 'applications')
 * @returns Object containing only routes for the specified category
 */
export const getRoutesByCategory = (category: string): Partial<RouteMapping> => {
    return Object.fromEntries(
        Object.entries(ROUTE_MAPPING).filter(([_key, value]) =>
            (value as string).startsWith(`/${category}`),
        ),
    );
};
