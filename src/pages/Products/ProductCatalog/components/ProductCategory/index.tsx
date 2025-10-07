import type React from 'react';
import { useCallback, useMemo } from 'react';

import { Typography } from 'antd';

import { InfoCircleOutlined } from '@ant-design/icons';

import { getPaginatedItems } from '../../utils/product-catalog.utils';
import ProductCard from '../ProductCard';
import ProductPagination from '../ProductPagination';
import styles from './ProductCategory.module.scss';
import type { ProductCategoryComponentProps } from './ProductCategory.types';

const { Title, Paragraph } = Typography;

/**
 * ProductCategory Component
 *
 * Displays a category of products with pagination
 * CRO-optimized for product discovery and conversion
 */
const ProductCategory: React.FC<ProductCategoryComponentProps> = ({
    category,
    pagination,
    onPageChange,
    onProductClick,
    onAddToCart,
    className = '',
    variant = 'default',
    showCategoryDescription = true,
    productsPerRow = 4,
    onCategoryClick,
    onPageSizeChange,
}) => {
    // Get paginated products
    const paginatedProducts = useMemo(() => {
        return getPaginatedItems(category.products, pagination.currentPage, pagination.pageSize);
    }, [category.products, pagination.currentPage, pagination.pageSize]);

    // Handle category click
    const handleCategoryClick = useCallback(() => {
        if (onCategoryClick) {
            onCategoryClick(category.id);
        }
    }, [onCategoryClick, category.id]);

    // Generate class names
    const classNames = useMemo(() => {
        const classes = ['product-category'];

        if (className) classes.push(className);
        if (variant !== 'default') classes.push(`product-category--${variant}`);
        if (productsPerRow) classes.push(`product-category--products-${productsPerRow}`);
        if (paginatedProducts.length === 0) classes.push('product-category--empty');

        return classes.join(' ');
    }, [className, variant, productsPerRow, paginatedProducts.length]);

    // Render empty state
    const renderEmptyState = useCallback(
        () => (
            <div className={styles['product-category__empty']}>
                <InfoCircleOutlined className={styles['product-category__empty-icon']} />
                <Title level={4} className={styles['product-category__empty-title']}>
                    No products found
                </Title>
                <Paragraph className={styles['product-category__empty-description']}>
                    This category doesn&apos;t have any products yet. Check back later!
                </Paragraph>
            </div>
        ),
        [],
    );

    // Render category header
    const renderCategoryHeader = useCallback(
        () => (
            <div className={styles['product-category__header']}>
                <Title
                    level={2}
                    className={styles['product-category__title']}
                    onClick={handleCategoryClick}
                    role={onCategoryClick ? 'button' : undefined}
                    tabIndex={onCategoryClick ? 0 : undefined}
                    onKeyDown={e => {
                        if (onCategoryClick && (e.key === 'Enter' || e.key === ' ')) {
                            e.preventDefault();
                            handleCategoryClick();
                        }
                    }}
                    aria-label={
                        onCategoryClick
                            ? `View all products in ${category.name}`
                            : `Category: ${category.name}`
                    }
                >
                    {category.name}
                </Title>
                {showCategoryDescription && category.description && (
                    <Paragraph className={styles['product-category__description']}>
                        {category.description}
                    </Paragraph>
                )}
            </div>
        ),
        [
            category.name,
            category.description,
            showCategoryDescription,
            handleCategoryClick,
            onCategoryClick,
        ],
    );

    // Render products grid
    const renderProductsGrid = useCallback(() => {
        if (paginatedProducts.length === 0) {
            return renderEmptyState();
        }

        return (
            <div className={styles['product-category__products-grid']}>
                {paginatedProducts.map(product => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        onProductClick={onProductClick ?? (() => {})}
                        onAddToCart={onAddToCart ?? (() => {})}
                        variant={variant}
                        showRating={true}
                        showQuickActions={true}
                    />
                ))}
            </div>
        );
    }, [paginatedProducts, onProductClick, onAddToCart, variant, renderEmptyState]);

    // Render pagination
    const renderPagination = useCallback(() => {
        if (pagination.totalPages <= 1) return null;

        return (
            <ProductPagination
                pagination={pagination}
                onPageChange={onPageChange}
                showTotal={true}
                showSizeChanger={true}
                showQuickJumper={variant !== 'compact'}
                showLessItems={variant === 'compact'}
                size={
                    variant === 'compact' ? 'small' : variant === 'detailed' ? 'large' : 'default'
                }
                responsive={true}
                hideOnSinglePage={true}
                onPageSizeChange={onPageSizeChange}
                pageSizeOptions={['2', '4', '8', '12', '24']}
                className={`product-category-pagination product-category-pagination--${variant}`}
            />
        );
    }, [pagination, onPageChange, variant, onPageSizeChange]);

    return (
        <section className={classNames} aria-labelledby={`category-${category.id}`} role="region">
            {renderCategoryHeader()}
            {renderProductsGrid()}
            {renderPagination()}
        </section>
    );
};

export default ProductCategory;
