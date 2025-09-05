import type {
    DispersionConfig,
    ProductAccessory,
    ProductDetail,
    ProductImage,
    ProductQA,
    ProductResource,
    ProductReview,
} from '../types/product-detail.types';

/**
 * Utility functions for product detail operations
 * Following functional programming principles and immutability
 */

// Image utilities
export const getMainImages = (images: ProductImage[]): ProductImage[] => {
    return images.filter(img => img.type === 'main' || img.type === 'gallery');
};

export const getContextImages = (images: ProductImage[]): ProductImage[] => {
    return images.filter(img => img.type === 'context');
};

export const getImageByType = (
    images: ProductImage[],
    type: 'main' | 'gallery' | 'context',
): ProductImage[] => {
    return images.filter(img => img.type === type);
};

export const generateImageGallery = (images: ProductImage[]): string[] => {
    return images.map(img => img.src);
};

// Price utilities
export const formatPrice = (price: number, currency: string = 'USD'): string => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
        minimumFractionDigits: 2,
    }).format(price);
};

export const calculateSavings = (originalPrice: number, currentPrice: number): number => {
    return originalPrice - currentPrice;
};

export const calculateSavingsPercentage = (originalPrice: number, currentPrice: number): number => {
    return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
};

export const formatSavings = (savings: number): string => {
    return `Save ${formatPrice(savings)}`;
};

// Dispersion utilities
export const getDispersionConfig = (
    configs: Record<number, DispersionConfig>,
    angle: number,
): DispersionConfig | null => {
    return configs[angle] || null;
};

export const getAvailableDispersionAngles = (
    configs: Record<number, DispersionConfig>,
): number[] => {
    return Object.keys(configs)
        .map(Number)
        .sort((a, b) => a - b);
};

export const getDispersionAngleFromConfig = (config: DispersionConfig): number => {
    return parseInt(config.angle.replace('°', ''));
};

// System builder utilities
export const calculateSystemTotal = (
    productPrice: number,
    quantity: number,
    selectedAccessories: string[],
    accessories: ProductAccessory[],
): number => {
    const basePrice = productPrice * quantity;
    const accessoryPrice = selectedAccessories.reduce((total, accessoryId) => {
        const accessory = accessories.find(acc => acc.id === accessoryId);
        return total + (accessory ? accessory.price : 0);
    }, 0);
    return basePrice + accessoryPrice;
};

export const getSelectedAccessories = (
    selectedAccessories: string[],
    accessories: ProductAccessory[],
): ProductAccessory[] => {
    return selectedAccessories
        .map(id => accessories.find(acc => acc.id === id))
        .filter((acc): acc is ProductAccessory => acc !== undefined);
};

export const getRecommendedAccessories = (accessories: ProductAccessory[]): ProductAccessory[] => {
    return accessories.filter(acc => acc.recommended);
};

export const getCompatibleAccessories = (accessories: ProductAccessory[]): ProductAccessory[] => {
    return accessories.filter(acc => acc.compatible);
};

// Review utilities
export const filterReviewsByRating = (
    reviews: ProductReview[],
    rating: number | 'all',
): ProductReview[] => {
    if (rating === 'all') return reviews;
    return reviews.filter(review => review.rating === rating);
};

export const sortReviews = (reviews: ProductReview[], sortBy: string): ProductReview[] => {
    const sortedReviews = [...reviews];

    switch (sortBy) {
        case 'newest':
            return sortedReviews.sort(
                (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
            );
        case 'oldest':
            return sortedReviews.sort(
                (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
            );
        case 'highest':
            return sortedReviews.sort((a, b) => b.rating - a.rating);
        case 'lowest':
            return sortedReviews.sort((a, b) => a.rating - b.rating);
        default:
            return sortedReviews;
    }
};

export const calculateAverageRating = (reviews: ProductReview[]): number => {
    if (reviews.length === 0) return 0;
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    return Number((totalRating / reviews.length).toFixed(1));
};

export const getRatingDistribution = (reviews: ProductReview[]): Record<number, number> => {
    const distribution: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };

    reviews.forEach(review => {
        distribution[review.rating] = (distribution[review.rating] || 0) + 1;
    });

    return distribution;
};

export const getRatingPercentage = (reviews: ProductReview[], rating: number): number => {
    const distribution = getRatingDistribution(reviews);
    const total = reviews.length;
    return total > 0 ? Math.round((distribution[rating] / total) * 100) : 0;
};

// Q&A utilities
export const searchQA = (qa: ProductQA[], query: string): ProductQA[] => {
    if (!query.trim()) return qa;

    const searchTerm = query.toLowerCase().trim();

    return qa.filter(
        item =>
            item.question.toLowerCase().includes(searchTerm) ||
            item.answer.toLowerCase().includes(searchTerm) ||
            item.answeredBy.toLowerCase().includes(searchTerm),
    );
};

export const sortQA = (qa: ProductQA[], sortBy: string): ProductQA[] => {
    const sortedQA = [...qa];

    switch (sortBy) {
        case 'newest':
            return sortedQA.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        case 'oldest':
            return sortedQA.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        case 'most_helpful':
            return sortedQA.sort((a, b) => b.helpful - a.helpful);
        default:
            return sortedQA;
    }
};

// Resource utilities
export const filterResourcesByType = (
    resources: ProductResource[],
    type: string,
): ProductResource[] => {
    if (type === 'all') return resources;
    return resources.filter(resource => resource.type.toLowerCase() === type.toLowerCase());
};

export const getResourceTypes = (resources: ProductResource[]): string[] => {
    const types = resources.map(resource => resource.type);
    return Array.from(new Set(types));
};

export const formatFileSize = (size: string): string => {
    return size;
};

// Validation utilities
export const validateProductDetail = (
    product: Partial<ProductDetail>,
): product is ProductDetail => {
    return !!(
        product.id &&
        product.name &&
        product.price &&
        typeof product.price === 'number' &&
        product.price >= 0 &&
        product.images &&
        Array.isArray(product.images) &&
        product.images.length > 0
    );
};

export const validateDispersionConfig = (
    config: Partial<DispersionConfig>,
): config is DispersionConfig => {
    return !!(
        config.angle &&
        config.sensitivity &&
        config.frequencyResponse &&
        config.description &&
        config.useCase
    );
};

// Format utilities
export const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

export const formatRelativeDate = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return 'Yesterday';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
    if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`;
    return `${Math.floor(diffInDays / 365)} years ago`;
};

// Error handling utilities
export const createProductDetailError = (
    code: string,
    message: string,
    details?: Record<string, unknown>,
) => ({
    code,
    message,
    details,
});

export const isProductDetailError = (
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

// Share utilities
export const shareProduct = async (product: ProductDetail): Promise<void> => {
    const shareData = {
        title: product.name,
        text: product.tagline,
        url: window.location.href,
    };

    if (navigator.share) {
        try {
            await navigator.share(shareData);
        } catch (error) {
            console.error('Error sharing:', error);
        }
    } else {
        // Fallback to clipboard
        try {
            await navigator.clipboard.writeText(window.location.href);
        } catch (error) {
            console.error('Error copying to clipboard:', error);
        }
    }
};

// Download utilities
export const downloadResource = (resource: ProductResource): void => {
    const link = document.createElement('a');
    link.href = resource.url;
    link.download = `${resource.title}.${resource.type.toLowerCase()}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};
