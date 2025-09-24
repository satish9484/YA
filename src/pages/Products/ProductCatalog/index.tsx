import type React from 'react';
import { useCallback, useMemo, useState } from 'react';

import { Button, Typography } from 'antd';

// Breadcrumbs are now handled by Breadcrumbs component
import { ExclamationCircleOutlined, ReloadOutlined, ShoppingCartOutlined } from '@ant-design/icons';

// Old useBreadcrumbs hook removed - using Breadcrumbs now
// Import modular components
import ProductCategory from './components/ProductCategory';
// Import types and data
import { productCategories } from './data';
// Import hooks and utilities
import { useProductCatalog } from './hooks/useProductCatalog';
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
    // showBreadcrumbs = true,
}) => {
    // State management
    const [currentPages, setCurrentPages] = useState<Record<string, number>>({});

    // Custom hooks
    const { state, actions } = useProductCatalog(initialCategories);

    // Calculate total stats
    const totalStats = useMemo(() => {
        const totalProducts = state.categories.reduce(
            (sum, category) => sum + category.products.length,
            0,
        );
        const totalCategories = state.categories.length;
        const averagePrice =
            state.categories.reduce((sum, category) => {
                const categoryStats = calculateCategoryStats(category);
                return sum + categoryStats.averagePrice;
            }, 0) / totalCategories;

        return {
            totalProducts,
            totalCategories,
            averagePrice: Number(averagePrice.toFixed(2)),
        };
    }, [state.categories]);

    // Handle page change for a category
    const handlePageChange = useCallback(
        (categoryId: string, page: number) => {
            setCurrentPages(prev => ({ ...prev, [categoryId]: page }));
            actions.setPageForCategory(categoryId, page);
        },
        [actions],
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

    // Handle retry
    const handleRetry = useCallback(() => {
        actions.loadCategories();
    }, [actions]);

    // Render loading state
    const renderLoadingState = useCallback(
        () => (
            <div className={`${styles['product-catalog']} ${styles['product-catalog--loading']}`}>
                <div className="container">
                    {/* Breadcrumbs are now handled by parent components using Breadcrumbs */}

                    <div className={styles['product-catalog__header']}>
                        <div className={styles['product-catalog__header-content']}>
                            <Title level={1} className={styles['product-catalog__header-title']}>
                                Loading Products...
                            </Title>
                            <Paragraph className={styles['product-catalog__header-description']}>
                                Please wait while we load our amazing products for you.
                            </Paragraph>
                        </div>
                    </div>
                </div>
            </div>
        ),
        [],
    );

    // Render error state
    const renderErrorState = useCallback(
        () => (
            <div className={`${styles['product-catalog']} ${styles['product-catalog--error']}`}>
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

                    <div className={styles['product-catalog__error']}>
                        <ExclamationCircleOutlined
                            className={styles['product-catalog__error-icon']}
                        />
                        <Title level={3} className={styles['product-catalog__error-title']}>
                            Failed to Load Products
                        </Title>
                        <Paragraph className={styles['product-catalog__error-description']}>
                            We&apos;re having trouble loading our products. Please try again.
                        </Paragraph>
                        <Button
                            type="primary"
                            icon={<ReloadOutlined />}
                            onClick={handleRetry}
                            className={styles['product-catalog__error-retry']}
                        >
                            Try Again
                        </Button>
                    </div>
                </div>
            </div>
        ),
        [handleRetry],
    );

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
                        {state.categories.map(category => {
                            const currentPage = currentPages[category.id] || 1;
                            const pagination = calculatePagination(
                                category.products.length,
                                currentPage,
                                productsPerPage,
                            );

                            return (
                                <ProductCategory
                                    key={category.id}
                                    category={category}
                                    pagination={pagination}
                                    onPageChange={page => handlePageChange(category.id, page)}
                                    onProductClick={handleProductClick}
                                    onAddToCart={handleAddToCart}
                                    onCategoryClick={handleCategoryClick}
                                    variant="default"
                                    showCategoryDescription={true}
                                    productsPerRow={4}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
        ),
        [
            state.categories,
            currentPages,
            productsPerPage,
            totalStats,
            handlePageChange,
            handleProductClick,
            handleAddToCart,
            handleCategoryClick,
        ],
    );

    // Determine what to render based on state
    if (state.loading) {
        return renderLoadingState();
    }

    if (state.error) {
        return renderErrorState();
    }

    if (state.categories.length === 0) {
        return renderEmptyState();
    }

    return renderMainContent();
};

export default ProductCatalog;
