import type React from 'react';
import { useCallback, useMemo } from 'react';

// New import
import type { Product } from '../../types';
import { getPaginatedItems } from '../../utils/product-catalog.utils';
import ProductPagination from '../ProductPagination';
import CategoryHeader from './CategoryHeader';
// New import
import type { ProductCategoryComponentProps } from './ProductCategory.types';
import ProductsGrid from './ProductsGrid';

/**
 * ProductCategory Component
 *
 * Displays a category of products with pagination.
 * It composes the CategoryHeader, ProductsGrid, and ProductPagination components.
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
    const paginatedProducts = useMemo(() => {
        return getPaginatedItems(category.products, pagination.currentPage, pagination.pageSize);
    }, [category.products, pagination.currentPage, pagination.pageSize]);

    const handleCategoryClick = useCallback(() => {
        if (onCategoryClick) {
            onCategoryClick(category.id);
        }
    }, [onCategoryClick, category.id]);

    const classNames = useMemo(() => {
        const classes = ['product-category'];
        if (className) classes.push(className);
        if (variant !== 'default') classes.push(`product-category--${variant}`);
        if (productsPerRow) classes.push(`product-category--products-${productsPerRow}`);
        if (paginatedProducts.length === 0) classes.push('product-category--empty');
        return classes.join(' ');
    }, [className, variant, productsPerRow, paginatedProducts.length]);

    return (
        <section className={classNames} aria-labelledby={`category-${category.id}`} role="region">
            <CategoryHeader
                id={category.id}
                name={category.name}
                showDescription={showCategoryDescription}
                {...(onCategoryClick && { onClick: handleCategoryClick })}
                {...(category.description && { description: category.description })}
            />

            <ProductsGrid
                products={paginatedProducts as Product[]}
                variant={variant}
                {...(onProductClick && { onProductClick })}
                {...(onAddToCart && { onAddToCart })}
            />

            {pagination.totalPages > 1 && (
                <ProductPagination
                    pagination={pagination}
                    onPageChange={onPageChange}
                    onPageSizeChange={onPageSizeChange}
                    showTotal={true}
                    showSizeChanger={true}
                    showQuickJumper={variant !== 'compact'}
                    showLessItems={variant === 'compact'}
                    size={
                        variant === 'compact'
                            ? 'small'
                            : variant === 'detailed'
                              ? 'large'
                              : 'default'
                    }
                    responsive={true}
                    hideOnSinglePage={true}
                    pageSizeOptions={['2', '4', '8', '12', '24']}
                    className={`product-category-pagination product-category-pagination--${variant}`}
                />
            )}
        </section>
    );
};

export default ProductCategory;
