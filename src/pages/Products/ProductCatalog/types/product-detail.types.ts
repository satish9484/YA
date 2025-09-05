// Base product detail interface
export interface ProductDetail {
    readonly id: string;
    readonly name: string;
    readonly tagline: string;
    readonly price: number;
    readonly originalPrice?: number;
    readonly inStock: boolean;
    readonly stockCount: number;
    readonly sku: string;
    readonly brand: string;
    readonly category: string;
    readonly rating: number;
    readonly reviewCount: number;
    readonly warranty: string;
    readonly images: ProductImage[];
    readonly dispersionConfigs: DispersionConfigs;
    readonly specifications: ProductSpecifications;
    readonly applications: ProductApplication[];
    readonly accessories: ProductAccessory[];
    readonly reviews: ProductReview[];
    readonly qa: ProductQA[];
    readonly resources: ProductResource[];
}

// Image gallery interfaces
export interface ProductImage {
    readonly id: number;
    readonly src: string;
    readonly alt: string;
    readonly type: 'main' | 'gallery' | 'context';
}

export interface ProductImageGalleryProps {
    readonly images: ProductImage[];
    readonly selectedImage: number;
    readonly onImageSelect: (index: number) => void;
    readonly onImageClick?: (image: ProductImage) => void;
    readonly showThumbnails?: boolean;
    readonly showContextGallery?: boolean;
}

// Dispersion configuration interfaces
export interface DispersionConfig {
    readonly angle: string;
    readonly sensitivity: string;
    readonly frequencyResponse: string;
    readonly description: string;
    readonly useCase: string;
}

export interface DispersionConfigs {
    readonly [key: number]: DispersionConfig;
}

export interface DispersionShowcaseProps {
    readonly configs: DispersionConfigs;
    readonly selectedDispersion: number;
    readonly onDispersionChange: (angle: number) => void;
}

// Product information interfaces
export interface ProductInfoProps {
    readonly product: ProductDetail;
    readonly quantity: number;
    readonly onQuantityChange: (quantity: number) => void;
    readonly onAddToCart: () => void;
    readonly onAddToWishlist: () => void;
    readonly onShare: () => void;
    readonly wishlist: boolean;
}

// Specifications interfaces
export interface ProductSpecification {
    readonly key: string;
    readonly value: string;
}

export interface ProductSpecifications {
    readonly performance: ProductSpecification[];
    readonly directivity: ProductSpecification[];
    readonly components: ProductSpecification[];
    readonly connections: ProductSpecification[];
    readonly physical: ProductSpecification[];
}

export interface TechnicalSpecsProps {
    readonly specifications: ProductSpecifications;
    readonly onDownloadSpecs: () => void;
}

// Application interfaces
export interface ProductApplication {
    readonly id: number;
    readonly title: string;
    readonly image: string;
    readonly description: string;
    readonly features: string[];
}

export interface ApplicationsGalleryProps {
    readonly applications: ProductApplication[];
    readonly onApplicationClick?: (application: ProductApplication) => void;
}

// System builder interfaces
export interface ProductAccessory {
    readonly id: string;
    readonly name: string;
    readonly price: number;
    readonly image: string;
    readonly description: string;
    readonly compatible: boolean;
    readonly recommended: boolean;
}

export interface SystemBuilderProps {
    readonly product: ProductDetail;
    readonly accessories: ProductAccessory[];
    readonly selectedAccessories: string[];
    readonly quantity: number;
    readonly onAccessoryToggle: (accessoryId: string) => void;
    readonly onAddSystemToCart: () => void;
}

// Review interfaces
export interface ProductReview {
    readonly id: number;
    readonly user: string;
    readonly rating: number;
    readonly date: string;
    readonly verified: boolean;
    readonly title: string;
    readonly content: string;
    readonly helpful: number;
    readonly images: string[];
}

export interface ReviewsSectionProps {
    readonly reviews: ProductReview[];
    readonly productRating: number;
    readonly reviewCount: number;
    readonly onLoadMoreReviews: () => void;
    readonly onFilterReviews: (filter: string) => void;
    readonly onSortReviews: (sort: string) => void;
}

// Q&A interfaces
export interface ProductQA {
    readonly id: number;
    readonly question: string;
    readonly answer: string;
    readonly answeredBy: string;
    readonly date: string;
    readonly helpful: number;
}

export interface QASectionProps {
    readonly qa: ProductQA[];
    readonly onAskQuestion: (question: string) => void;
    readonly onSearchQA: (query: string) => void;
    readonly onLoadMoreQA: () => void;
}

// Resource interfaces
export interface ProductResource {
    readonly id: number;
    readonly title: string;
    readonly type: string;
    readonly size: string;
    readonly url: string;
    readonly icon: React.ReactNode;
}

export interface ResourceHubProps {
    readonly resources: ProductResource[];
    readonly onDownloadResource: (resource: ProductResource) => void;
}

// Hook return types
export interface UseProductDetailReturn {
    readonly product: ProductDetail | null;
    readonly loading: boolean;
    readonly error: string | null;
    readonly selectedImage: number;
    readonly selectedDispersion: number;
    readonly quantity: number;
    readonly selectedAccessories: string[];
    readonly wishlist: boolean;
    readonly actions: {
        readonly setSelectedImage: (index: number) => void;
        readonly setSelectedDispersion: (angle: number) => void;
        readonly setQuantity: (quantity: number) => void;
        readonly toggleAccessory: (accessoryId: string) => void;
        readonly toggleWishlist: () => void;
        readonly addToCart: () => void;
        readonly addSystemToCart: () => void;
        readonly share: () => void;
    };
}

export interface UseDispersionConfigReturn {
    readonly selectedDispersion: number;
    readonly currentConfig: DispersionConfig | null;
    readonly setSelectedDispersion: (angle: number) => void;
    readonly getConfigByAngle: (angle: number) => DispersionConfig | null;
}

export interface UseSystemBuilderReturn {
    readonly selectedAccessories: string[];
    readonly totalPrice: number;
    readonly toggleAccessory: (accessoryId: string) => void;
    readonly calculateTotal: () => number;
    readonly getSelectedAccessories: () => ProductAccessory[];
}

export interface UseReviewsReturn {
    readonly reviews: ProductReview[];
    readonly filteredReviews: ProductReview[];
    readonly loading: boolean;
    readonly filter: string;
    readonly sort: string;
    readonly actions: {
        readonly setFilter: (filter: string) => void;
        readonly setSort: (sort: string) => void;
        readonly loadMoreReviews: () => void;
        readonly markHelpful: (reviewId: number) => void;
    };
}

// Event handler types
export type ImageSelectHandler = (index: number) => void;
export type DispersionChangeHandler = (angle: number) => void;
export type QuantityChangeHandler = (quantity: number) => void;
export type AccessoryToggleHandler = (accessoryId: string) => void;
export type ReviewFilterHandler = (filter: string) => void;
export type QASearchHandler = (query: string) => void;

// Component props interfaces
export interface ProductDetailProps {
    readonly productId?: string | undefined;
    readonly onProductClick?: ((product: ProductDetail) => void) | undefined;
    readonly onAddToCart?: ((product: ProductDetail, quantity: number) => void) | undefined;
    readonly onAddToWishlist?: ((product: ProductDetail) => void) | undefined;
    readonly onShare?: ((product: ProductDetail) => void) | undefined;
}

// Utility types
export type ProductDetailTab = 'specifications' | 'reviews' | 'qa' | 'resources';
export type ReviewFilter = 'all' | '5' | '4' | '3' | '2' | '1';
export type ReviewSort = 'newest' | 'oldest' | 'highest' | 'lowest';
export type ImageType = 'main' | 'gallery' | 'context';

// API response types
export interface ProductDetailApiResponse {
    readonly success: boolean;
    readonly data: ProductDetail;
    readonly error?: string;
}

// Error types
export interface ProductDetailError {
    readonly code: string;
    readonly message: string;
    readonly details?: Record<string, unknown>;
}

// Loading states
export type ProductDetailLoadingState = 'idle' | 'loading' | 'success' | 'error';

export interface ProductDetailAsyncState<T> {
    readonly data: T | null;
    readonly loading: ProductDetailLoadingState;
    readonly error: ProductDetailError | null;
}
