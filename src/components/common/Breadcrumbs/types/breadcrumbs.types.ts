import type { ReactNode } from 'react';

/**
 * Breadcrumb item interface
 * Maps to the route structure defined in routes.tsx
 */
export interface BreadcrumbItem {
    /** Unique identifier for the breadcrumb item */
    readonly id: string;
    /** Display name for the breadcrumb item */
    readonly name: string;
    /** Router name that maps to a route in routes.tsx */
    readonly routerName: string;
    /** Optional icon for the breadcrumb item */
    readonly icon?: ReactNode;
    /** Whether this is the current/active page (last item) */
    readonly isActive?: boolean;
}

/**
 * Props for the Breadcrumbs component
 */
export interface BreadcrumbsProps {
    /** Array of breadcrumb items to display */
    readonly items: BreadcrumbItem[];
    /** Additional CSS class name */
    readonly className?: string;
    /** Custom separator between breadcrumb items */
    readonly separator?: ReactNode;
    /** Whether to show home icon for the first item */
    readonly showHome?: boolean;
    /** Custom home icon */
    readonly homeIcon?: ReactNode;
    /** Maximum number of items to show before truncation */
    readonly maxItems?: number;
    /** Callback when a breadcrumb item is clicked */
    readonly onItemClick?: (item: BreadcrumbItem, index: number) => void;
    /** ARIA label for accessibility */
    readonly ariaLabel?: string;
}

/**
 * Route mapping configuration
 * Maps router names to actual route paths
 */
export interface RouteMapping {
    readonly [routerName: string]: string;
}

/**
 * Breadcrumb item click event
 */
export interface BreadcrumbClickEvent {
    readonly item: BreadcrumbItem;
    readonly index: number;
    readonly event: React.MouseEvent<HTMLAnchorElement>;
}
