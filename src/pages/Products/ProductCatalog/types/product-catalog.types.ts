// Base product interface
export interface Product {
    readonly id: string;
    readonly name: string;
    readonly image: string;
    readonly price: number;
    readonly description: string;
    readonly category?: string;
    readonly inStock?: boolean;
    readonly rating?: number;
    readonly reviewCount?: number;
    readonly tags?: string[];
    readonly specifications?: Record<string, string>;
}

// Product category interface (for backward compatibility)
export interface ProductCategory {
    readonly id: string;
    readonly name: string;
    readonly description?: string;
    readonly products: Product[];
    readonly totalCount: number;
}

// Hierarchical category structure (matches new JSON structure)
export interface HierarchicalProductCategory {
    readonly categoryName: string;
    readonly subCategories: HierarchicalProductSubCategory[];
}

export interface HierarchicalProductSubCategory {
    readonly subCategoryName: string;
    readonly products: Product[];
}

// Pagination state interface
export interface PaginationState {
    readonly currentPage: number;
    readonly pageSize: number;
    readonly totalItems: number;
    readonly totalPages: number;
}

// Product catalog state interface
export interface ProductCatalogState {
    readonly categories: ProductCategory[];
    readonly hierarchicalCategories?: HierarchicalProductCategory[];
    readonly pagination: Record<string, PaginationState>;
    readonly loading: boolean;
    readonly error: string | null;
}

// Component props interfaces
export interface ProductCatalogProps {
    readonly initialCategories?: ProductCategory[];
    readonly hierarchicalCategories?: HierarchicalProductCategory[];
    readonly productsPerPage?: number;
    readonly onProductClick?: (product: Product) => void;
    readonly onAddToCart?: (product: Product) => void;
    readonly showBreadcrumbs?: boolean;
    readonly useHierarchicalView?: boolean;
}

export interface ProductCategoryProps {
    readonly category: ProductCategory;
    readonly pagination: PaginationState;
    readonly onPageChange: (page: number) => void;
    readonly onProductClick?: (product: Product) => void;
    readonly onAddToCart?: (product: Product) => void;
}

export interface ProductCardProps {
    readonly product: Product;
    readonly onProductClick?: (product: Product) => void;
    readonly onAddToCart?: (product: Product) => void;
    readonly showQuickActions?: boolean;
}

export interface ProductImageGalleryProps {
    readonly images: string[];
    readonly productName: string;
    readonly onImageClick?: (imageIndex: number) => void;
}

export interface ProductPaginationProps {
    readonly pagination: PaginationState;
    readonly onPageChange: (page: number) => void;
    readonly showTotal?: boolean;
    readonly showSizeChanger?: boolean;
    readonly pageSizeOptions?: string[];
    readonly onPageSizeChange?: ((current: number, size: number) => void) | undefined;
}

// Hierarchical component props
export interface HierarchicalProductCategoryProps {
    readonly category: HierarchicalProductCategory;
    readonly onProductClick?: (product: Product) => void;
    readonly onAddToCart?: (product: Product) => void;
    readonly showSubCategoryHeaders?: boolean;
}

export interface HierarchicalProductSubCategoryProps {
    readonly subCategory: HierarchicalProductSubCategory;
    readonly onProductClick?: (product: Product) => void;
    readonly onAddToCart?: (product: Product) => void;
    readonly showSubCategoryName?: boolean;
}

// Hook return types
export interface UseProductPaginationReturn {
    readonly pagination: PaginationState;
    readonly setCurrentPage: (page: number) => void;
    readonly setPageSize: (size: number) => void;
    readonly goToFirstPage: () => void;
    readonly goToLastPage: () => void;
    readonly canGoNext: boolean;
    readonly canGoPrevious: boolean;
}

export interface UseProductCatalogReturn {
    readonly state: ProductCatalogState;
    readonly actions: {
        readonly loadCategories: () => Promise<void>;
        readonly refreshCategory: (categoryId: string) => Promise<void>;
        readonly setPageForCategory: (categoryId: string, page: number) => void;
        readonly setPageSizeForCategory: (categoryId: string, size: number) => void;
    };
}

// Event handler types
export type ProductClickHandler = (product: Product) => void;
export type AddToCartHandler = (product: Product) => void;
export type PageChangeHandler = (page: number) => void;
export type ImageClickHandler = (imageIndex: number) => void;

// Utility types
export type ProductSortField = 'name' | 'price' | 'rating' | 'dateAdded';
export type SortDirection = 'asc' | 'desc';

export interface ProductSortOptions {
    readonly field: ProductSortField;
    readonly direction: SortDirection;
}

// Hierarchical data utility types
export type HierarchicalDataView = 'flat' | 'hierarchical';
export type CategoryDisplayMode = 'cards' | 'list' | 'grid';

// API response types
export interface ProductCatalogApiResponse {
    readonly success: boolean;
    readonly data: ProductCategory[];
    readonly error?: string;
    readonly pagination?: {
        readonly total: number;
        readonly page: number;
        readonly pageSize: number;
    };
}

// Error types
export interface ProductCatalogError {
    readonly code: string;
    readonly message: string;
    readonly details?: Record<string, unknown>;
}

// Loading states
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

export interface AsyncState<T> {
    readonly data: T | null;
    readonly loading: LoadingState;
    readonly error: ProductCatalogError | null;
}
