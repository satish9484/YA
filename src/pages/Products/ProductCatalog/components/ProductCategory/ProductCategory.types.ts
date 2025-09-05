import type { Product, ProductCategoryProps } from '../../types/product-catalog.types';

export interface ProductCategoryComponentProps extends ProductCategoryProps {
    readonly className?: string;
    readonly variant?: 'default' | 'compact' | 'detailed';
    readonly showCategoryDescription?: boolean;
    readonly productsPerRow?: number;
    readonly onCategoryClick?: (categoryId: string) => void;
}

export interface ProductCategoryHeaderProps {
    readonly category: {
        readonly id: string;
        readonly name: string;
        readonly description?: string;
    };
    readonly onCategoryClick?: (categoryId: string) => void;
    readonly showDescription?: boolean;
}

export interface ProductCategoryGridProps {
    readonly products: readonly Product[];
    readonly productsPerRow?: number;
    readonly onProductClick?: (product: Product) => void;
    readonly onAddToCart?: (product: Product) => void;
    readonly variant?: 'default' | 'compact' | 'detailed';
}
