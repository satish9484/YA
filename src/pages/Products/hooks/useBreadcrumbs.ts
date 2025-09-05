import { useCallback, useMemo } from 'react';
import { useLocation } from 'react-router-dom';

import type { BreadcrumbItem } from '@/components/common/Breadcrumbs/types/breadcrumbs.types';

import { getBreadcrumbIcon } from '../utils/breadcrumb-icons';
import {
    generateBreadcrumbsFromPath,
    generateCategoryPageBreadcrumbs,
    generateProductDetailBreadcrumbs,
} from '../utils/breadcrumb.utils';

/**
 * Custom hook for managing breadcrumbs in Products pages
 * Automatically generates appropriate breadcrumb trails based on current route and context
 */
export const useBreadcrumbs = (context?: {
    categoryId?: string;
    categoryName?: string;
    productId?: string;
    productName?: string;
}) => {
    const location = useLocation();

    // Generate breadcrumbs based on context or current path
    const breadcrumbs = useMemo((): BreadcrumbItem[] => {
        let baseBreadcrumbs: BreadcrumbItem[] = [];

        // If context is provided, use it to generate specific breadcrumbs
        if (context) {
            const { categoryId, categoryName, productId, productName } = context;

            if (productId && productName && categoryId && categoryName) {
                // Product detail page
                baseBreadcrumbs = generateProductDetailBreadcrumbs(
                    productId,
                    productName,
                    categoryId,
                    categoryName,
                );
            } else if (categoryId && categoryName) {
                // Category page
                baseBreadcrumbs = generateCategoryPageBreadcrumbs(categoryId, categoryName);
            }
        } else {
            // Fallback to path-based generation
            baseBreadcrumbs = generateBreadcrumbsFromPath(location.pathname);
        }

        // Add icons to breadcrumbs
        return baseBreadcrumbs.map(item => ({
            ...item,
            icon: getBreadcrumbIcon(item.id),
        }));
    }, [location.pathname, context]);

    // Handle breadcrumb item clicks
    const handleBreadcrumbClick = useCallback((item: BreadcrumbItem, _index: number) => {
        if (item.link) {
            // In a real app, you would use navigate from react-router-dom
            // navigate(item.link);
            console.log('Navigate to:', item.link);
        }
    }, []);

    return {
        breadcrumbs,
        handleBreadcrumbClick,
    };
};
