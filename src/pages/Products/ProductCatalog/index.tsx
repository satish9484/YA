import type React from 'react';
import { useCallback, useMemo, useState } from 'react';

import { Typography } from 'antd';

// Breadcrumbs are now handled by Breadcrumbs component
import { ShoppingCartOutlined } from '@ant-design/icons';

// Import modular components
import ProductCategory from './components/ProductCategory';
// Import types and data
import { productCategories } from './data';
// Utilities
// Import styles
import styles from './ProductCatalog.module.scss';
import type { Product, ProductCatalogProps } from './types/product-catalog.types';
import { calculateCategoryStats, calculatePagination } from './utils/product-catalog.utils';

const { Title, Paragraph } = Typography;

/**
 * ProductCatalog Component
 *
 * Main product catalog page with modular architecture
 * CRO-optimized for product discovery and conversion
 */
const ProductCatalog: React.FC<ProductCatalogProps> = ({
    initialCategories = productCategories,
    productsPerPage = 4,
    onProductClick,
    onAddToCart,
}) => {
    
    // State management
    const [currentPages, setCurrentPages] = useState<Record<string, number>>({});
    const [categoryPagination, setCategoryPagination] = useState<Record<string, { pageSize: number }>>({});

    // Derive categories from props (sanitized) – no external hook needed
    const categories =   initialCategories ;


    // Calculate total stats
    const totalStats = useMemo(() => {
        const totalProducts = categories.reduce(
            (sum, category) => sum + category.products.length,
            0,
        );
        const totalCategories = categories.length;
        const averagePrice =
            categories.reduce((sum, category) => {
                const categoryStats = calculateCategoryStats(category);
                return sum + categoryStats.averagePrice;
            }, 0) / totalCategories;

        return {
            totalProducts,
            totalCategories,
            averagePrice: Number(averagePrice.toFixed(2)),
        };
    }, [categories]);

    console.log('totalStats', categories);

    // Handle page change for a category
    const handlePageChange = useCallback(
        (categoryId: string, page: number) => {
            setCurrentPages(prev => ({ ...prev, [categoryId]: page }));
        },
        [],
    );

    // Handle page size change for a category
    const handlePageSizeChange = useCallback(
        (categoryId: string, current: number, size: number) => {
            setCategoryPagination(prev => ({ ...prev, [categoryId]: { pageSize: size } }));
            setCurrentPages(prev => ({ ...prev, [categoryId]: current }));
        },
        [],
    );

    // Handle product click
    const handleProductClick = useCallback(
        (product: Product) => {
            if (onProductClick) {
                onProductClick(product);
            } else {
                // Default behavior - could navigate to product detail page
                console.log('Product clicked:', product);
            }
        },
        [onProductClick],
    );

    // Handle add to cart
    const handleAddToCart = useCallback(
        (product: Product) => {
            if (onAddToCart) {
                onAddToCart(product);
            } else {
                // Default behavior - could show success message
                console.log('Product added to cart:', product);
            }
        },
        [onAddToCart],
    );

    // Handle category click
    const handleCategoryClick = useCallback((categoryId: string) => {
        // Could navigate to category page or expand category
        console.log('Category clicked:', categoryId);
    }, []);

    // No remote loading/error states; we render based on provided data

    // Render empty state
    const renderEmptyState = useCallback(
        () => (
            <div className={`${styles['product-catalog']} ${styles['product-catalog--empty']}`}>
                <div className="container">
                    {/* Breadcrumbs are now handled by parent components using Breadcrumbs */}

                    <div className={styles['product-catalog__header']}>
                        <div className={styles['product-catalog__header-content']}>
                            <Title level={1} className={styles['product-catalog__header-title']}>
                                Our Product Catalog
                            </Title>
                            <Paragraph className={styles['product-catalog__header-description']}>
                                Discover our range of professional audio equipment
                            </Paragraph>
                        </div>
                    </div>

                    <div className={styles['product-catalog__empty']}>
                        <ShoppingCartOutlined className={styles['product-catalog__empty-icon']} />
                        <Title level={3} className={styles['product-catalog__empty-title']}>
                            No Products Available
                        </Title>
                        <Paragraph className={styles['product-catalog__empty-description']}>
                            We&apos;re currently updating our product catalog. Please check back
                            soon!
                        </Paragraph>
                    </div>
                </div>
            </div>
        ),
        [],
    );

    // Render main content
    const renderMainContent = useCallback(
        () => (
            <div className={styles['product-catalog']}>
                <div className="container">
                    {/* Breadcrumbs are now handled by parent components using Breadcrumbs */}

                    {/* Header */}
                    <div className={styles['product-catalog__header']}>
                        <div className={styles['product-catalog__header-content']}>
                            <Title level={1} className={styles['product-catalog__header-title']}>
                                Our Product Catalog
                            </Title>
                            <Paragraph className={styles['product-catalog__header-description']}>
                                Discover our range of professional audio equipment designed for
                                exceptional performance
                            </Paragraph>

                            {/* Stats */}
                            <div className={styles['product-catalog__header-stats']}>
                                <div className={styles['product-catalog__header-stat']}>
                                    <span className={styles['product-catalog__header-stat-value']}>
                                        {totalStats.totalProducts}
                                    </span>
                                    <span className={styles['product-catalog__header-stat-label']}>
                                        Products
                                    </span>
                                </div>
                                <div className={styles['product-catalog__header-stat']}>
                                    <span className={styles['product-catalog__header-stat-value']}>
                                        {totalStats.totalCategories}
                                    </span>
                                    <span className={styles['product-catalog__header-stat-label']}>
                                        Categories
                                    </span>
                                </div>
                                <div className={styles['product-catalog__header-stat']}>
                                    <span className={styles['product-catalog__header-stat-value']}>
                                        ${totalStats.averagePrice}
                                    </span>
                                    <span className={styles['product-catalog__header-stat-label']}>
                                        Avg Price
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Categories */}
                    <div className={styles['product-catalog__categories']}>
                        {categories.map(category => {
                            const currentPage = currentPages[category.id] || 1;
                            const defaultPageSize =
                                typeof window !== 'undefined' && window.innerWidth >= 992
                                    ? productsPerPage
                                    : Math.min(productsPerPage, 4);
                            const pageSize =
                                categoryPagination[category.id]?.pageSize || defaultPageSize;
                            const pagination = calculatePagination(
                                category.products.length,
                                currentPage,
                                pageSize,
                            );

                            return (
                                <ProductCategory
                                    key={category.id}
                                    category={category}
                                    pagination={pagination}
                                    onPageChange={page => handlePageChange(category.id, page)}
                                    onPageSizeChange={(current, size) =>
                                        handlePageSizeChange(category.id, current, size)
                                    }
                                    onProductClick={handleProductClick}
                                    onAddToCart={handleAddToCart}
                                    onCategoryClick={handleCategoryClick}
                                    variant="default"
                                    showCategoryDescription={true}
                                    productsPerRow={3}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
        ),
        [
            categories,
            currentPages,
            categoryPagination,
            productsPerPage,
            totalStats,
            handlePageChange,
            handleProductClick,
            handleAddToCart,
            handleCategoryClick,
        ],
    );

    // Determine what to render based on state
    if (categories.length === 0) {
        return renderEmptyState();
    }

    return renderMainContent();
};

export default ProductCatalog;
