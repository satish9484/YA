import type { BreadcrumbItem } from '@/components/common/Breadcrumbs/types/breadcrumbs.types';
import { createBreadcrumbItem } from '@/components/common/Breadcrumbs/utils/breadcrumbs.utils';

/**
 * Breadcrumb utilities for Products pages
 * Generates appropriate breadcrumb trails based on current page and context
 */

// Base breadcrumb items
export const HOME_BREADCRUMB = createBreadcrumbItem(
    'home',
    'Home',
    false,
    '/',
    undefined, // Icon will be set in component
    'Go to home page',
);

export const PRODUCTS_BREADCRUMB = createBreadcrumbItem(
    'products',
    'Products',
    false,
    '/products',
    undefined, // Icon will be set in component
    'Browse all products',
);

// Category breadcrumbs
export const createCategoryBreadcrumb = (
    categoryId: string,
    categoryName: string,
    isActive: boolean = false,
): BreadcrumbItem => {
    return createBreadcrumbItem(
        categoryId,
        categoryName,
        isActive,
        isActive ? undefined : `/products/${categoryId}`,
        undefined, // Icon will be set in component
        isActive ? `Current category: ${categoryName}` : `View ${categoryName} products`,
    );
};

// Product breadcrumbs
export const createProductBreadcrumb = (
    productId: string,
    productName: string,
    categoryId: string,
    categoryName: string,
    isActive: boolean = false,
): BreadcrumbItem => {
    return createBreadcrumbItem(
        productId,
        productName,
        isActive,
        isActive ? undefined : `/products/${categoryId}/${productId}`,
        undefined,
        isActive
            ? `Current product: ${productName} in ${categoryName}`
            : `View ${productName} details in ${categoryName}`,
    );
};

// Breadcrumb trail generators
export const generateProductsPageBreadcrumbs = (): BreadcrumbItem[] => {
    return [HOME_BREADCRUMB, { ...PRODUCTS_BREADCRUMB, isActive: true }];
};

export const generateCategoryPageBreadcrumbs = (
    categoryId: string,
    categoryName: string,
): BreadcrumbItem[] => {
    return [
        HOME_BREADCRUMB,
        PRODUCTS_BREADCRUMB,
        createCategoryBreadcrumb(categoryId, categoryName, true),
    ];
};

export const generateProductDetailBreadcrumbs = (
    productId: string,
    productName: string,
    categoryId: string,
    categoryName: string,
): BreadcrumbItem[] => {
    return [
        HOME_BREADCRUMB,
        PRODUCTS_BREADCRUMB,
        createCategoryBreadcrumb(categoryId, categoryName, false),
        createProductBreadcrumb(productId, productName, categoryId, categoryName, true),
    ];
};

// Dynamic breadcrumb generation based on URL path
export const generateBreadcrumbsFromPath = (pathname: string): BreadcrumbItem[] => {
    const pathSegments = pathname.split('/').filter(Boolean);

    if (pathSegments.length === 0) {
        return [HOME_BREADCRUMB];
    }

    if (pathSegments.length === 1 && pathSegments[0] === 'products') {
        return generateProductsPageBreadcrumbs();
    }

    if (pathSegments.length === 2 && pathSegments[0] === 'products') {
        const secondSegment = pathSegments[1];

        // Check if it's a known category
        const knownCategories = [
            'line-array',
            'monitors',
            'subwoofers',
            'amplifiers',
            'processors',
        ];
        if (knownCategories.includes(secondSegment)) {
            const categoryId = secondSegment;
            const categoryName = formatCategoryName(categoryId);
            return generateCategoryPageBreadcrumbs(categoryId, categoryName);
        }

        // If it's not a known category, treat it as a product ID
        const productId = secondSegment;
        const productName = formatProductName(productId);
        const { categoryId, categoryName } = getProductCategory(productId);
        return generateProductDetailBreadcrumbs(productId, productName, categoryId, categoryName);
    }

    if (pathSegments.length === 3 && pathSegments[0] === 'products') {
        const categoryId = pathSegments[1];
        const productId = pathSegments[2];
        const categoryName = formatCategoryName(categoryId);
        const productName = formatProductName(productId);
        return generateProductDetailBreadcrumbs(productId, productName, categoryId, categoryName);
    }

    // Fallback to home
    return [HOME_BREADCRUMB];
};

// Helper functions
export const formatCategoryName = (categoryId: string): string => {
    const categoryNames: Record<string, string> = {
        'line-array': 'Line Array Speakers',
        processors: 'Audio Processors',
        amplifiers: 'Amplifiers',
        subwoofers: 'Subwoofers',
        monitors: 'Studio Monitors',
    };

    return (
        categoryNames[categoryId] ||
        categoryId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
    );
};

export const formatProductName = (productId: string): string => {
    return productId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
};

// Product ID to category mapping
export const getProductCategory = (
    productId: string,
): { categoryId: string; categoryName: string } => {
    const productCategoryMap: Record<string, { categoryId: string; categoryName: string }> = {
        'toa-hx5b': { categoryId: 'line-array', categoryName: 'Line Array Speakers' },
        // Add more product mappings as needed
    };

    return (
        productCategoryMap[productId] || {
            categoryId: 'line-array',
            categoryName: 'Line Array Speakers',
        }
    );
};

// Breadcrumb context for different pages
export const BREADCRUMB_CONTEXTS = {
    PRODUCTS: 'products',
    CATEGORY: 'category',
    PRODUCT_DETAIL: 'product-detail',
} as const;

export type BreadcrumbContext = (typeof BREADCRUMB_CONTEXTS)[keyof typeof BREADCRUMB_CONTEXTS];
