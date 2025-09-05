// Breadcrumb item interface
export interface BreadcrumbItem {
    readonly id: string;
    readonly name: string;
    readonly link?: string | undefined;
    readonly isActive: boolean;
    readonly icon?: React.ReactNode | undefined;
    readonly ariaLabel?: string | undefined;
}

// Main breadcrumbs component props
export interface BreadcrumbsProps {
    readonly items: BreadcrumbItem[];
    readonly className?: string;
    readonly variant?: 'default' | 'compact' | 'detailed';
    readonly separator?: 'chevron' | 'slash' | 'arrow' | 'dot';
    readonly showHome?: boolean;
    readonly homeIcon?: React.ReactNode;
    readonly maxItems?: number;
    readonly onItemClick?: (item: BreadcrumbItem, index: number) => void;
    readonly ariaLabel?: string;
}

// Breadcrumb item component props
export interface BreadcrumbItemProps {
    readonly item: BreadcrumbItem;
    readonly index: number;
    readonly isLast: boolean;
    readonly separator: BreadcrumbsProps['separator'];
    readonly onClick?: (item: BreadcrumbItem, index: number) => void;
    readonly className?: string;
}

// Breadcrumb separator component props
export interface BreadcrumbSeparatorProps {
    readonly type: BreadcrumbsProps['separator'];
    readonly className?: string;
}

// Hook return types
export interface UseBreadcrumbsReturn {
    readonly visibleItems: BreadcrumbItem[];
    readonly hiddenItems: BreadcrumbItem[];
    readonly showEllipsis: boolean;
    readonly actions: {
        readonly expandBreadcrumbs: () => void;
        readonly collapseBreadcrumbs: () => void;
        readonly isExpanded: boolean;
    };
}

// Utility types
export type BreadcrumbVariant = 'default' | 'compact' | 'detailed';
export type BreadcrumbSeparator = 'chevron' | 'slash' | 'arrow' | 'dot';

// Event handler types
export type BreadcrumbItemClickHandler = (item: BreadcrumbItem, index: number) => void;

// API response types
export interface BreadcrumbApiResponse {
    readonly success: boolean;
    readonly data: BreadcrumbItem[];
    readonly error?: string;
}

// Error types
export interface BreadcrumbError {
    readonly code: string;
    readonly message: string;
    readonly details?: Record<string, unknown>;
}

// Loading states
export type BreadcrumbLoadingState = 'idle' | 'loading' | 'success' | 'error';

export interface BreadcrumbAsyncState<T> {
    readonly data: T | null;
    readonly loading: BreadcrumbLoadingState;
    readonly error: BreadcrumbError | null;
}
