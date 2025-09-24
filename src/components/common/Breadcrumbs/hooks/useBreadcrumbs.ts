import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

import type { BreadcrumbItem } from '../types/breadcrumbs.types';

/**
 * Custom hook for managing breadcrumbs
 * Provides utilities for creating breadcrumb items and managing state
 */
export const useBreadcrumbs = () => {
    const location = useLocation();

    /**
     * Create a breadcrumb item with proper typing
     */
    const createBreadcrumbItem = useMemo(
        () =>
            (
                id: string,
                name: string,
                routerName: string,
                options: {
                    icon?: React.ReactNode;
                    isActive?: boolean;
                } = {},
            ): BreadcrumbItem => ({
                id,
                name,
                routerName,
                icon: options.icon,
                isActive: options.isActive ?? false,
            }),
        [],
    );

    /**
     * Create breadcrumb items for a product page
     */
    const createProductBreadcrumbs = useMemo(
        () =>
            (
                productName: string,
                productId: string,
                category: 'line-array' | 'monitors' | 'subwoofers' | 'amplifiers' | 'processors',
            ): BreadcrumbItem[] => [
                createBreadcrumbItem('home', 'Home', 'home'),
                createBreadcrumbItem('products', 'Products', 'products'),
                createBreadcrumbItem(category, getCategoryDisplayName(category), category),
                createBreadcrumbItem(productId, productName, 'line-array-detail', {
                    isActive: true,
                }),
            ],
        [createBreadcrumbItem],
    );

    /**
     * Create breadcrumb items for an application page
     */
    const createApplicationBreadcrumbs = useMemo(
        () =>
            (applicationName: string, applicationId: string): BreadcrumbItem[] => [
                createBreadcrumbItem('home', 'Home', 'home'),
                createBreadcrumbItem('applications', 'Applications', 'applications'),
                createBreadcrumbItem(applicationId, applicationName, applicationId, {
                    isActive: true,
                }),
            ],
        [createBreadcrumbItem],
    );

    /**
     * Create breadcrumb items for a category page
     */
    const createCategoryBreadcrumbs = useMemo(
        () =>
            (
                categoryName: string,
                categoryId: string,
                parentCategory?: string,
            ): BreadcrumbItem[] => {
                const items: BreadcrumbItem[] = [createBreadcrumbItem('home', 'Home', 'home')];

                if (parentCategory) {
                    items.push(
                        createBreadcrumbItem(
                            parentCategory,
                            getCategoryDisplayName(parentCategory),
                            parentCategory,
                        ),
                    );
                }

                items.push(
                    createBreadcrumbItem(categoryId, categoryName, categoryId, { isActive: true }),
                );

                return items;
            },
        [createBreadcrumbItem],
    );

    /**
     * Create breadcrumb items for a general page
     */
    const createPageBreadcrumbs = useMemo(
        () =>
            (pageName: string, pageId: string): BreadcrumbItem[] => [
                createBreadcrumbItem('home', 'Home', 'home'),
                createBreadcrumbItem(pageId, pageName, pageId, { isActive: true }),
            ],
        [createBreadcrumbItem],
    );

    /**
     * Get breadcrumb items based on current location
     */
    const getBreadcrumbsFromLocation = useMemo(() => {
        const pathname = location.pathname;

        // Handle root path
        if (pathname === '/') {
            return [createBreadcrumbItem('home', 'Home', 'home', { isActive: true })];
        }

        // Handle products
        if (pathname.startsWith('/products')) {
            const segments = pathname.split('/').filter(Boolean);

            if (segments.length === 1) {
                return [
                    createBreadcrumbItem('home', 'Home', 'home'),
                    createBreadcrumbItem('products', 'Products', 'products', { isActive: true }),
                ];
            }

            if (segments.length === 2) {
                const category = segments[1];
                return [
                    createBreadcrumbItem('home', 'Home', 'home'),
                    createBreadcrumbItem('products', 'Products', 'products'),
                    createBreadcrumbItem(category, getCategoryDisplayName(category), category, {
                        isActive: true,
                    }),
                ];
            }

            if (segments.length === 3) {
                const category = segments[1];
                const productId = segments[2];
                return [
                    createBreadcrumbItem('home', 'Home', 'home'),
                    createBreadcrumbItem('products', 'Products', 'products'),
                    createBreadcrumbItem(category, getCategoryDisplayName(category), category),
                    createBreadcrumbItem(
                        productId,
                        getProductDisplayName(productId),
                        'line-array-detail',
                        { isActive: true },
                    ),
                ];
            }
        }

        // Handle applications
        if (pathname.startsWith('/applications')) {
            const segments = pathname.split('/').filter(Boolean);

            if (segments.length === 1) {
                return [
                    createBreadcrumbItem('home', 'Home', 'home'),
                    createBreadcrumbItem('applications', 'Applications', 'applications', {
                        isActive: true,
                    }),
                ];
            }

            if (segments.length === 2) {
                const application = segments[1];
                return [
                    createBreadcrumbItem('home', 'Home', 'home'),
                    createBreadcrumbItem('applications', 'Applications', 'applications'),
                    createBreadcrumbItem(
                        application,
                        getApplicationDisplayName(application),
                        application,
                        { isActive: true },
                    ),
                ];
            }
        }

        // Handle other pages
        if (pathname === '/about') {
            return [
                createBreadcrumbItem('home', 'Home', 'home'),
                createBreadcrumbItem('about', 'About', 'about', { isActive: true }),
            ];
        }

        if (pathname === '/contact') {
            return [
                createBreadcrumbItem('home', 'Home', 'home'),
                createBreadcrumbItem('contact', 'Contact', 'contact', { isActive: true }),
            ];
        }

        // Default fallback
        return [createBreadcrumbItem('home', 'Home', 'home', { isActive: true })];
    }, [location.pathname, createBreadcrumbItem]);

    return {
        createBreadcrumbItem,
        createProductBreadcrumbs,
        createApplicationBreadcrumbs,
        createCategoryBreadcrumbs,
        createPageBreadcrumbs,
        getBreadcrumbsFromLocation,
        currentPath: location.pathname,
    };
};

/**
 * Helper function to get display name for category
 */
const getCategoryDisplayName = (category: string): string => {
    const categoryMap: Record<string, string> = {
        'line-array': 'Line Array',
        monitors: 'Stage Monitors',
        subwoofers: 'Subwoofers',
        amplifiers: 'Power Amplifiers',
        processors: 'Signal Processors',
    };

    return categoryMap[category] || category;
};

/**
 * Helper function to get display name for application
 */
const getApplicationDisplayName = (application: string): string => {
    const applicationMap: Record<string, string> = {
        'live-sound': 'Live Sound',
        corporate: 'Corporate Events',
        worship: 'Worship Spaces',
        entertainment: 'Entertainment',
        outdoor: 'Outdoor Events',
    };

    return applicationMap[application] || application;
};

/**
 * Helper function to get display name for product
 */
const getProductDisplayName = (productId: string): string => {
    // This could be enhanced to fetch from an API or use a product mapping
    return productId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
};
