import type { Product, ProductCardProps } from '../../types/product-catalog.types';

export interface ProductCardComponentProps extends ProductCardProps {
    readonly className?: string;
    readonly variant?: 'default' | 'compact' | 'detailed';
    readonly showRating?: boolean;
    readonly showQuickActions?: boolean;
    readonly imageHeight?: number;
    readonly onImageClick?: (product: Product) => void;
}

export interface ProductCardActionsProps {
    readonly product: Product;
    readonly onAddToCart?: (product: Product) => void;
    readonly onQuickView?: (product: Product) => void;
    readonly onCompare?: (product: Product) => void;
    readonly onWishlist?: (product: Product) => void;
}

export interface ProductCardImageProps {
    readonly product: Product;
    readonly height?: number;
    readonly onImageClick?: (product: Product) => void;
    readonly showGallery?: boolean;
}

export interface ProductCardInfoProps {
    readonly product: Product;
    readonly variant?: 'default' | 'compact' | 'detailed';
    readonly showRating?: boolean;
}
