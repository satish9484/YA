import type {
    PaginationState,
    Product,
    ProductCategory,
    ProductSortOptions,
} from '../types/product-catalog.types';

/**
 * Utility functions for product catalog operations
 * Following functional programming principles and immutability
 */

// Pagination utilities
export const createPaginationState = (
    currentPage: number = 1,
    pageSize: number = 4,
    totalItems: number = 0,
): PaginationState => ({
    currentPage: Math.max(1, currentPage),
    pageSize: Math.max(1, pageSize),
    totalItems: Math.max(0, totalItems),
    totalPages: Math.ceil(Math.max(0, totalItems) / Math.max(1, pageSize)),
});

export const calculatePagination = (
    totalItems: number,
    currentPage: number,
    pageSize: number,
): PaginationState => {
    const totalPages = Math.ceil(totalItems / pageSize);
    const validCurrentPage = Math.min(Math.max(1, currentPage), totalPages);

    return {
        currentPage: validCurrentPage,
        pageSize,
        totalItems,
        totalPages,
    };
};

export const getPaginatedItems = <T>(
    items: readonly T[],
    currentPage: number,
    pageSize: number,
): readonly T[] => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return items.slice(startIndex, endIndex);
};

// Product utilities
export const formatPrice = (price: number, currency: string = 'USD'): string => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
        minimumFractionDigits: 2,
    }).format(price);
};

export const formatProductName = (name: string, maxLength: number = 50): string => {
    if (name.length <= maxLength) return name;
    return `${name.substring(0, maxLength - 3)}...`;
};

export const generateProductSlug = (name: string): string => {
    return name
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
};

// Sorting utilities
export const sortProducts = (
    products: readonly Product[],
    options: ProductSortOptions,
): readonly Product[] => {
    return [...products].sort((a, b) => {
        let aValue: string | number;
        let bValue: string | number;

        switch (options.field) {
            case 'name':
                aValue = a.name.toLowerCase();
                bValue = b.name.toLowerCase();
                break;
            case 'price':
                aValue = a.price;
                bValue = b.price;
                break;
            case 'rating':
                aValue = a.rating ?? 0;
                bValue = b.rating ?? 0;
                break;
            case 'dateAdded':
                // Assuming products have a dateAdded field, fallback to id for now
                aValue = a.id;
                bValue = b.id;
                break;
            default:
                return 0;
        }

        if (aValue < bValue) return options.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return options.direction === 'asc' ? 1 : -1;
        return 0;
    });
};

// Search and filter utilities
export const searchProducts = (products: readonly Product[], query: string): readonly Product[] => {
    if (!query.trim()) return products;

    const searchTerm = query.toLowerCase().trim();

    return products.filter(
        product =>
            product.name.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm) ||
            (product.tags?.some(tag => tag.toLowerCase().includes(searchTerm)) ?? false),
    );
};

export const filterProductsByPrice = (
    products: readonly Product[],
    minPrice: number,
    maxPrice: number,
): readonly Product[] => {
    return products.filter(product => product.price >= minPrice && product.price <= maxPrice);
};

export const filterProductsByCategory = (
    products: readonly Product[],
    category: string,
): readonly Product[] => {
    if (!category) return products;
    return products.filter(product => product.category === category);
};

// Category utilities
export const calculateCategoryStats = (category: ProductCategory) => {
    const products = category.products;
    const totalProducts = products.length;
    const averagePrice = products.reduce((sum, product) => sum + product.price, 0) / totalProducts;
    const inStockCount = products.filter(product => product.inStock !== false).length;
    const averageRating =
        products
            .filter(product => product.rating !== undefined)
            .reduce((sum, product) => sum + (product.rating ?? 0), 0) /
        products.filter(product => product.rating !== undefined).length;

    return {
        totalProducts,
        averagePrice: Number(averagePrice.toFixed(2)),
        inStockCount,
        outOfStockCount: totalProducts - inStockCount,
        averageRating: Number((averageRating || 0).toFixed(1)),
    };
};

// Validation utilities
export const validateProduct = (product: Partial<Product>): product is Product => {
    return !!(
        product.id &&
        product.name &&
        typeof product.price === 'number' &&
        product.price >= 0
    );
};

export const coerceProduct = (product: Partial<Product>): Product | null => {
    // require minimal identity fields
    if (!product.id || !product.name) return null;

    // coerce numeric fields
    const parsedPrice =
        typeof product.price === 'string' ? parseFloat(product.price) : product.price;
    if (typeof parsedPrice !== 'number' || Number.isNaN(parsedPrice)) return null;

    const safeImage =
        product.image && String(product.image).trim()
            ? (product.image as string)
            : '/images/placeholder.png';
    const safeDescription = (product.description as string) ?? '';
    const safeInStock = product.inStock ?? true;
    return {
        id: product.id,
        name: product.name,
        image: safeImage,
        price: Math.max(0, parsedPrice),
        description: safeDescription,
        category: product.category ?? '',
        inStock: safeInStock,
        rating: product.rating ?? 0,
        reviewCount: product.reviewCount ?? 0,
        tags: product.tags ?? [],
        specifications: product.specifications ?? {},
    };
};

export const validateProductCategory = (
    category: Partial<ProductCategory>,
): category is ProductCategory => {
    // Lenient: allow partial category; sanitize later
    return !!(category && typeof category === 'object');
};

export const sanitizeCategory = (category: ProductCategory): ProductCategory => {
    const products = (category.products || [])
        .map(p => coerceProduct(p))
        .filter((p): p is Product => p !== null);
    return {
        ...category,
        products,
        totalCount: products.length,
    };
};

// Image utilities
export const getImagePlaceholder = (width: number = 300, height: number = 200): string => {
    return `data:image/svg+xml;base64,${btoa(`
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#f5f5f5"/>
      <text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="#999" font-family="Arial, sans-serif" font-size="14">
        No Image
      </text>
    </svg>
  `)}`;
};

export const generateImageGallery = (product: Product): string[] => {
    const images = [product.image];

    // Add placeholder images for demo purposes
    const placeholderImages = ['/bg/bg-2.jpg', '/bg/empty-speaker-cabinet.jpg', '/bg/bg-1.webp'];

    return [...images, ...placeholderImages.slice(0, 3)];
};

// Error handling utilities
export const createError = (code: string, message: string, details?: Record<string, unknown>) => ({
    code,
    message,
    details,
});

export const isNetworkError = (error: unknown): boolean => {
    return (
        error instanceof Error &&
        (error.message.includes('Network Error') ||
            error.message.includes('Failed to fetch') ||
            error.message.includes('timeout'))
    );
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
