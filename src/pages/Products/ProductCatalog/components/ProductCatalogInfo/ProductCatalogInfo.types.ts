import type { ProductInfoProps } from '../../types/product-detail.types';

export interface ProductCatalogInfoComponentProps extends ProductInfoProps {
    readonly className?: string;
    readonly showTrustSignals?: boolean;
    readonly showKeyFeatures?: boolean;
    readonly showStockAlert?: boolean;
    readonly variant?: 'default' | 'compact' | 'detailed';
}

export interface PricingSectionProps {
    readonly price: number;
    readonly originalPrice?: number;
    readonly inStock: boolean;
    readonly stockCount: number;
    readonly showStockAlert?: boolean;
}

export interface KeyFeaturesProps {
    readonly features: string[];
    readonly showTitle?: boolean;
}

export interface TrustSignalsProps {
    readonly warranty: string;
    readonly showTechnicalSupport?: boolean;
    readonly showShipping?: boolean;
}

export interface PurchaseActionsProps {
    readonly quantity: number;
    readonly maxQuantity: number;
    readonly onQuantityChange: (quantity: number) => void;
    readonly onAddToCart: () => void;
    readonly onAddToWishlist: () => void;
    readonly onShare: () => void;
    readonly wishlist: boolean;
    readonly loading?: boolean;
}
