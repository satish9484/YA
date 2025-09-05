import type { BreadcrumbItem, BreadcrumbSeparator } from '../types/breadcrumbs.types';

/**
 * Utility functions for breadcrumbs operations
 * Following functional programming principles and immutability
 */

// Breadcrumb item utilities
export const createBreadcrumbItem = (
    id: string,
    name: string,
    isActive: boolean = false,
    link?: string,
    icon?: React.ReactNode,
    ariaLabel?: string,
): BreadcrumbItem => ({
    id,
    name,
    link,
    isActive,
    icon,
    ariaLabel: ariaLabel ?? name,
});

export const isBreadcrumbItemActive = (item: BreadcrumbItem): boolean => {
    return item.isActive;
};

export const hasBreadcrumbItemLink = (item: BreadcrumbItem): boolean => {
    return !!item.link;
};

export const getBreadcrumbItemAriaLabel = (item: BreadcrumbItem): string => {
    return item.ariaLabel ?? item.name;
};

// Breadcrumb list utilities
export const addBreadcrumbItem = (
    items: BreadcrumbItem[],
    newItem: BreadcrumbItem,
    position: 'start' | 'end' = 'end',
): BreadcrumbItem[] => {
    if (position === 'start') {
        return [newItem, ...items];
    }
    return [...items, newItem];
};

export const removeBreadcrumbItem = (items: BreadcrumbItem[], itemId: string): BreadcrumbItem[] => {
    return items.filter(item => item.id !== itemId);
};

export const updateBreadcrumbItem = (
    items: BreadcrumbItem[],
    itemId: string,
    updates: Partial<BreadcrumbItem>,
): BreadcrumbItem[] => {
    return items.map(item => (item.id === itemId ? { ...item, ...updates } : item));
};

export const setBreadcrumbItemActive = (
    items: BreadcrumbItem[],
    itemId: string,
): BreadcrumbItem[] => {
    return items.map(item => ({
        ...item,
        isActive: item.id === itemId,
    }));
};

// Breadcrumb truncation utilities
export const truncateBreadcrumbs = (
    items: BreadcrumbItem[],
    maxItems: number,
): {
    visibleItems: BreadcrumbItem[];
    hiddenItems: BreadcrumbItem[];
    showEllipsis: boolean;
} => {
    if (items.length <= maxItems) {
        return {
            visibleItems: items,
            hiddenItems: [],
            showEllipsis: false,
        };
    }

    // Always show the first item and the last item
    const firstItem = items[0];
    const lastItem = items[items.length - 1];
    const middleItems = items.slice(1, -1);

    // Calculate how many middle items we can show
    const availableSlots = maxItems - 2; // Reserve slots for first and last
    const visibleMiddleItems = middleItems.slice(0, Math.max(0, availableSlots - 1));
    const hiddenMiddleItems = middleItems.slice(visibleMiddleItems.length);

    return {
        visibleItems: [firstItem, ...visibleMiddleItems, lastItem],
        hiddenItems: hiddenMiddleItems,
        showEllipsis: hiddenMiddleItems.length > 0,
    };
};

export const expandBreadcrumbs = (items: BreadcrumbItem[]): BreadcrumbItem[] => {
    return items;
};

export const collapseBreadcrumbs = (
    items: BreadcrumbItem[],
    maxItems: number,
): BreadcrumbItem[] => {
    const { visibleItems } = truncateBreadcrumbs(items, maxItems);
    return visibleItems;
};

// Breadcrumb validation utilities
export const validateBreadcrumbItem = (item: Partial<BreadcrumbItem>): item is BreadcrumbItem => {
    return !!(item.id && item.name && typeof item.isActive === 'boolean');
};

export const validateBreadcrumbItems = (items: Partial<BreadcrumbItem>[]): BreadcrumbItem[] => {
    return items.filter(validateBreadcrumbItem);
};

// Breadcrumb navigation utilities
export const getBreadcrumbPath = (items: BreadcrumbItem[]): string[] => {
    return items
        .filter(item => item.link)
        .map(item => item.link!)
        .filter(Boolean);
};

export const getBreadcrumbDepth = (items: BreadcrumbItem[]): number => {
    return items.length;
};

export const getBreadcrumbLevel = (item: BreadcrumbItem, items: BreadcrumbItem[]): number => {
    return items.findIndex(i => i.id === item.id) + 1;
};

// Breadcrumb formatting utilities
export const formatBreadcrumbName = (name: string, maxLength: number = 30): string => {
    if (name.length <= maxLength) return name;
    return `${name.substring(0, maxLength - 3)}...`;
};

export const generateBreadcrumbId = (name: string, index: number): string => {
    return `${name.toLowerCase().replace(/\s+/g, '-')}-${index}`;
};

// Breadcrumb separator utilities
export const getSeparatorIcon = (separator: BreadcrumbSeparator): string => {
    const separators = {
        chevron: '›',
        slash: '/',
        arrow: '→',
        dot: '•',
    };
    return separators[separator];
};

export const getSeparatorAriaLabel = (separator: BreadcrumbSeparator): string => {
    const labels = {
        chevron: 'Navigate to',
        slash: 'In',
        arrow: 'Go to',
        dot: 'Part of',
    };
    return labels[separator];
};

// Breadcrumb accessibility utilities
export const getBreadcrumbAriaLabel = (items: BreadcrumbItem[]): string => {
    const activeItem = items.find(item => item.isActive);
    if (activeItem) {
        return `Breadcrumb navigation. Currently on ${activeItem.name}`;
    }
    return 'Breadcrumb navigation';
};

export const getBreadcrumbItemAriaCurrent = (item: BreadcrumbItem): string | undefined => {
    return item.isActive ? 'page' : undefined;
};

// Breadcrumb URL utilities
export const buildBreadcrumbUrl = (baseUrl: string, path: string): string => {
    const cleanBaseUrl = baseUrl.replace(/\/$/, '');
    const cleanPath = path.replace(/^\//, '');
    return `${cleanBaseUrl}/${cleanPath}`;
};

export const parseBreadcrumbFromUrl = (url: string): string[] => {
    return url
        .split('/')
        .filter(segment => segment.length > 0)
        .map(segment => decodeURIComponent(segment));
};

// Breadcrumb search utilities
export const findBreadcrumbItem = (
    items: BreadcrumbItem[],
    predicate: (item: BreadcrumbItem) => boolean,
): BreadcrumbItem | undefined => {
    return items.find(predicate);
};

export const findBreadcrumbItemById = (
    items: BreadcrumbItem[],
    id: string,
): BreadcrumbItem | undefined => {
    return items.find(item => item.id === id);
};

export const findBreadcrumbItemByName = (
    items: BreadcrumbItem[],
    name: string,
): BreadcrumbItem | undefined => {
    return items.find(item => item.name === name);
};

// Breadcrumb sorting utilities
export const sortBreadcrumbsByOrder = (items: BreadcrumbItem[]): BreadcrumbItem[] => {
    return [...items]; // Breadcrumbs are already in order
};

export const reverseBreadcrumbs = (items: BreadcrumbItem[]): BreadcrumbItem[] => {
    return [...items].reverse();
};

// Breadcrumb filtering utilities
export const filterActiveBreadcrumbs = (items: BreadcrumbItem[]): BreadcrumbItem[] => {
    return items.filter(item => item.isActive);
};

export const filterLinkedBreadcrumbs = (items: BreadcrumbItem[]): BreadcrumbItem[] => {
    return items.filter(item => !!item.link);
};

export const filterBreadcrumbsByLevel = (
    items: BreadcrumbItem[],
    level: number,
): BreadcrumbItem[] => {
    return items.filter((_, index) => index + 1 === level);
};

// Error handling utilities
export const createBreadcrumbError = (
    code: string,
    message: string,
    details?: Record<string, unknown>,
) => ({
    code,
    message,
    details,
});

export const isBreadcrumbError = (
    error: unknown,
): error is { code: string; message: string; details?: Record<string, unknown> } => {
    return typeof error === 'object' && error !== null && 'code' in error && 'message' in error;
};

// Performance utilities
export const debounce = <T extends (...args: unknown[]) => unknown>(
    func: T,
    wait: number,
): ((...args: Parameters<T>) => void) => {
    let timeout: NodeJS.Timeout;

    return (...args: Parameters<T>) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
};

export const throttle = <T extends (...args: unknown[]) => unknown>(
    func: T,
    limit: number,
): ((...args: Parameters<T>) => void) => {
    let inThrottle: boolean;

    return (...args: Parameters<T>) => {
        if (!inThrottle) {
            func(...args);
            inThrottle = true;
            setTimeout(() => (inThrottle = false), limit);
        }
    };
};
