// TypeScript Interface Schema for Line Array Products
// This schema matches the Redux implementation and JSON data structure

// Base Product Interface
export interface LineArrayProduct {
    _id: string;
    name: string;
    image: string;
    price: number;
    originalPrice?: number;
    description: string;
    category: 'Line Array Speakers' | 'Subwoofers' | 'Mounting Hardware';
    categoryId: 'line-array-professional' | 'line-array-accessories';
    categoryName: string;
    inStock: boolean;
    stockCount: number;
    rating?: number;
    reviewCount: number;
    tags: string[];
    specifications: ProductSpecifications;
    brand: string;
    sku: string;
    warranty: string;
    createdAt: string;
    updatedAt: string;
}

// Product Specifications Interface
export interface ProductSpecifications {
    [key: string]: string;
}

// API Response Interfaces
export interface LineArrayProductsResponse {
    success: boolean;
    data: LineArrayProduct[];
    total?: number;
    page?: number;
    limit?: number;
    totalPages?: number;
    message?: string;
}

export interface SingleProductResponse {
    success: boolean;
    data: LineArrayProduct;
    message?: string;
}

// Request Interfaces
export interface CreateProductRequest {
    name: string;
    image: string;
    price: number;
    originalPrice?: number;
    description: string;
    category: 'Line Array Speakers' | 'Subwoofers' | 'Mounting Hardware';
    categoryId: 'line-array-professional' | 'line-array-accessories';
    categoryName: string;
    inStock: boolean;
    stockCount: number;
    rating?: number;
    reviewCount: number;
    tags: string[];
    specifications: ProductSpecifications;
    brand: string;
    sku: string;
    warranty: string;
}

export interface UpdateProductRequest {
    _id: string;
    name?: string;
    image?: string;
    price?: number;
    originalPrice?: number;
    description?: string;
    category?: 'Line Array Speakers' | 'Subwoofers' | 'Mounting Hardware';
    categoryId?: 'line-array-professional' | 'line-array-accessories';
    categoryName?: string;
    inStock?: boolean;
    stockCount?: number;
    rating?: number;
    reviewCount?: number;
    tags?: string[];
    specifications?: ProductSpecifications;
    brand?: string;
    sku?: string;
    warranty?: string;
}

// Filter and Search Interfaces
export interface ProductFilters {
    category?: 'Line Array Speakers' | 'Subwoofers' | 'Mounting Hardware';
    brand?: string;
    minPrice?: number;
    maxPrice?: number;
    inStock?: boolean;
    tags?: string[];
    rating?: number;
}

export interface ProductSearchParams {
    search?: string;
    filters?: ProductFilters;
    sortBy?: 'price' | 'rating' | 'name' | 'createdAt';
    sortOrder?: 'asc' | 'desc';
    page?: number;
    limit?: number;
}

// Redux State Interface
export interface LineArrayProductsState {
    productList: LineArrayProduct[];
    productInfo: LineArrayProduct | null;
    isLoading: boolean;
    error: string | null;
    filters: ProductFilters;
    searchQuery: string;
    sortBy: 'price' | 'rating' | 'name' | 'createdAt';
    sortOrder: 'asc' | 'desc';
    pagination: {
        currentPage: number;
        totalPages: number;
        totalItems: number;
        itemsPerPage: number;
    };
}

// Error Interface
export interface ProductError {
    message: string;
    code?: string;
    field?: string;
}

// Utility Types
export type ProductSortField = 'price' | 'rating' | 'name' | 'createdAt';
export type SortOrder = 'asc' | 'desc';
export type ProductCategory = 'Line Array Speakers' | 'Subwoofers' | 'Mounting Hardware';
export type CategoryId = 'line-array-professional' | 'line-array-accessories';

// Computed Properties Interface
export interface ProductComputedProperties {
    discountPercentage: number;
    availabilityStatus: 'In Stock' | 'Low Stock' | 'Out of Stock';
    isLowStock: boolean;
    isOutOfStock: boolean;
}

// Extended Product Interface with computed properties
export interface ExtendedLineArrayProduct extends LineArrayProduct, ProductComputedProperties {}

// API Endpoint Types
export interface ProductListQueryParams {
    search?: string;
    category?: string;
    brand?: string;
    minPrice?: number;
    maxPrice?: number;
    inStock?: boolean;
    rating?: number;
    sortBy?: ProductSortField;
    sortOrder?: SortOrder;
    page?: number;
    limit?: number;
}

// Validation Error Interface
export interface ValidationError {
    field: string;
    message: string;
    value?: any;
}

// Bulk Operations Interface
export interface BulkProductOperation {
    operation: 'create' | 'update' | 'delete';
    products: LineArrayProduct[];
}

export interface BulkOperationResult {
    success: boolean;
    processed: number;
    failed: number;
    errors: ValidationError[];
    results: LineArrayProduct[];
}

// Product Statistics Interface
export interface ProductStatistics {
    totalProducts: number;
    totalInStock: number;
    totalOutOfStock: number;
    averagePrice: number;
    averageRating: number;
    categoryBreakdown: {
        [key in ProductCategory]: number;
    };
    brandBreakdown: {
        [brand: string]: number;
    };
    priceRange: {
        min: number;
        max: number;
        average: number;
    };
}

// All interfaces are already exported above
