import type React from 'react';

import { Typography } from 'antd';

import { InfoCircleOutlined } from '@ant-design/icons';

// Assuming styles are moved
import type { Product } from '../../types';
import ProductCard from '../ProductCard';
// Assuming a project-wide Product type definition
import type { ProductCategoryComponentProps } from '../ProductCategory/ProductCategory.types';
import styles from './ProductsGrid.module.scss';

const { Title, Paragraph } = Typography;

/**
 * A local component for rendering the empty state.
 * Could be extracted to its own file if used elsewhere.
 */
const EmptyState: React.FC = () => (
    <div className={styles['products-grid__empty']}>
        <InfoCircleOutlined className={styles['products-grid__empty-icon']} />
        <Title level={4} className={styles['products-grid__empty-title']}>
            No products found
        </Title>
        <Paragraph className={styles['products-grid__empty-description']}>
            This category doesn&apos;t have any products yet. Check back later!
        </Paragraph>
    </div>
);

/**
 * Prop types for the ProductsGrid component
 */
interface ProductsGridProps {
    products: Product[];
    variant: ProductCategoryComponentProps['variant'];
    onProductClick?: (product: Product) => void;
    onAddToCart?: (product: Product) => void;
}

/**
 * ProductsGrid Component
 *
 * Renders a grid of ProductCard components or an empty state message.
 */
const ProductsGrid: React.FC<ProductsGridProps> = ({
    products,
    variant,
    onProductClick,
    onAddToCart,
}) => {
    console.log('products', products[0]);
    if (products.length === 0) {
        return <EmptyState />;
    }

    return (
        <div className={styles['products-grid']}>
            {products.map(product => {
                const productCardProps = {
                    product,
                    onProductClick: onProductClick ?? (() => {}),
                    onAddToCart: onAddToCart ?? (() => {}),
                    showRating: true,
                    showQuickActions: true,
                    ...(variant && { variant }),
                };

                return <ProductCard key={product.id} {...productCardProps} />;
            })}
        </div>
    );
};

export default ProductsGrid;
