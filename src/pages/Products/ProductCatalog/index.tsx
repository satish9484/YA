import type React from 'react';
import { useCallback, useMemo, useState } from 'react';

import { Button, Typography } from 'antd';

// Import breadcrumbs
import Breadcrumbs from '@/components/common/Breadcrumbs';
import { ExclamationCircleOutlined, ReloadOutlined, ShoppingCartOutlined } from '@ant-design/icons';

import { useBreadcrumbs } from '../hooks/useBreadcrumbs';
// Import modular components
import ProductCategory from './components/ProductCategory';
// Import types and data
import { productCategories } from './data';
// Import hooks and utilities
import { useProductCatalog } from './hooks/useProductCatalog';
// Import styles
import './ProductCatalog.scss';
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

    // Custom hooks
    const { state, actions } = useProductCatalog(initialCategories);
    const { breadcrumbs, handleBreadcrumbClick } = useBreadcrumbs();

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
            <div className="product-catalog product-catalog--loading">
                <div className="product-catalog__container">
                    {/* Breadcrumbs */}
                    <Breadcrumbs
                        items={breadcrumbs}
                        onItemClick={handleBreadcrumbClick}
                        variant="default"
                        separator="chevron"
                    />

                    <div className="product-catalog__header">
                        <div className="product-catalog__header-content">
                            <Title level={1} className="product-catalog__header-title">
                                Loading Products...
                            </Title>
                            <Paragraph className="product-catalog__header-description">
                                Please wait while we load our amazing products for you.
                            </Paragraph>
                        </div>
                    </div>
                </div>
            </div>
        ),
        [breadcrumbs, handleBreadcrumbClick],
    );

    // Render error state
    const renderErrorState = useCallback(
        () => (
            <div className="product-catalog product-catalog--error">
                <div className="product-catalog__container">
                    {/* Breadcrumbs */}
                    <Breadcrumbs
                        items={breadcrumbs}
                        onItemClick={handleBreadcrumbClick}
                        variant="default"
                        separator="chevron"
                    />

                    <div className="product-catalog__header">
                        <div className="product-catalog__header-content">
                            <Title level={1} className="product-catalog__header-title">
                                Our Product Catalog
                            </Title>
                            <Paragraph className="product-catalog__header-description">
                                Discover our range of professional audio equipment
                            </Paragraph>
                        </div>
                    </div>

                    <div className="product-catalog__error">
                        <ExclamationCircleOutlined className="product-catalog__error-icon" />
                        <Title level={3} className="product-catalog__error-title">
                            Failed to Load Products
                        </Title>
                        <Paragraph className="product-catalog__error-description">
                            We&apos;re having trouble loading our products. Please try again.
                        </Paragraph>
                        <Button
                            type="primary"
                            icon={<ReloadOutlined />}
                            onClick={handleRetry}
                            className="product-catalog__error-retry"
                        >
                            Try Again
                        </Button>
                    </div>
                </div>
            </div>
        ),
        [breadcrumbs, handleBreadcrumbClick, handleRetry],
    );

    // Render empty state
    const renderEmptyState = useCallback(
        () => (
            <div className="product-catalog product-catalog--empty">
                <div className="product-catalog__container">
                    {/* Breadcrumbs */}
                    <Breadcrumbs
                        items={breadcrumbs}
                        onItemClick={handleBreadcrumbClick}
                        variant="default"
                        separator="chevron"
                    />

                    <div className="product-catalog__header">
                        <div className="product-catalog__header-content">
                            <Title level={1} className="product-catalog__header-title">
                                Our Product Catalog
                            </Title>
                            <Paragraph className="product-catalog__header-description">
                                Discover our range of professional audio equipment
                            </Paragraph>
                        </div>
                    </div>

                    <div className="product-catalog__empty">
                        <ShoppingCartOutlined className="product-catalog__empty-icon" />
                        <Title level={3} className="product-catalog__empty-title">
                            No Products Available
                        </Title>
                        <Paragraph className="product-catalog__empty-description">
                            We&apos;re currently updating our product catalog. Please check back
                            soon!
                        </Paragraph>
                    </div>
                </div>
            </div>
        ),
        [breadcrumbs, handleBreadcrumbClick],
    );

    // Render main content
    const renderMainContent = useCallback(
        () => (
            <div className="product-catalog">
                <div className="product-catalog__container">
                    {/* Breadcrumbs */}
                    <Breadcrumbs
                        items={breadcrumbs}
                        onItemClick={handleBreadcrumbClick}
                        variant="default"
                        separator="chevron"
                    />

                    {/* Header */}
                    <div className="product-catalog__header">
                        <div className="product-catalog__header-content">
                            <Title level={1} className="product-catalog__header-title">
                                Our Product Catalog
                            </Title>
                            <Paragraph className="product-catalog__header-description">
                                Discover our range of professional audio equipment designed for
                                exceptional performance
                            </Paragraph>

                            {/* Stats */}
                            <div className="product-catalog__header-stats">
                                <div className="product-catalog__header-stat">
                                    <span className="product-catalog__header-stat-value">
                                        {totalStats.totalProducts}
                                    </span>
                                    <span className="product-catalog__header-stat-label">
                                        Products
                                    </span>
                                </div>
                                <div className="product-catalog__header-stat">
                                    <span className="product-catalog__header-stat-value">
                                        {totalStats.totalCategories}
                                    </span>
                                    <span className="product-catalog__header-stat-label">
                                        Categories
                                    </span>
                                </div>
                                <div className="product-catalog__header-stat">
                                    <span className="product-catalog__header-stat-value">
                                        ${totalStats.averagePrice}
                                    </span>
                                    <span className="product-catalog__header-stat-label">
                                        Avg Price
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Categories */}
                    <div className="product-catalog__categories">
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
            breadcrumbs,
            handlePageChange,
            handleProductClick,
            handleAddToCart,
            handleCategoryClick,
            handleBreadcrumbClick,
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
