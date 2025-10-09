import type React from 'react';
import { useCallback, useMemo } from 'react';

import { Button } from 'antd';

import { EyeOutlined, HeartOutlined, ShoppingCartOutlined, SwapOutlined } from '@ant-design/icons';

import { formatPrice, formatProductName } from '../../utils/product-catalog.utils';
import ProductCatalogImageGallery from '../ProductCatalogImageGallery';
import styles from './ProductCard.module.scss';
import type { ProductCardComponentProps } from './ProductCard.types';

/**
 * ProductCard Component
 *
 * Displays individual product information with image gallery and actions
 * CRO-optimized for product discovery and conversion
 */
const ProductCard: React.FC<ProductCardComponentProps> = ({
    product,
    onProductClick,
    onAddToCart,
    className = '',
    variant = 'default',
    showRating = true,
    showQuickActions = true,
    imageHeight: _imageHeight = 180,
    onImageClick,
}) => {
    // Memoized formatted values
    const formattedPrice = useMemo(() => formatPrice(product.price), [product.price]);
    const formattedName = useMemo(() => formatProductName(product.name), [product.name]);

    // Handle product click
    const handleProductClick = useCallback(() => {
        if (onProductClick) {
            onProductClick(product);
        }
    }, [onProductClick, product]);

    // Handle add to cart
    const handleAddToCart = useCallback(
        (e: React.MouseEvent) => {
            e.stopPropagation();
            if (onAddToCart) {
                onAddToCart(product);
            }
        },
        [onAddToCart, product],
    );

    // Handle image click
    const handleImageClick = useCallback(() => {
        if (onImageClick) {
            onImageClick(product);
        }
    }, [onImageClick, product]);

    // Handle quick view
    const handleQuickView = useCallback(
        (e: React.MouseEvent) => {
            e.stopPropagation();
            if (onProductClick) {
                onProductClick(product);
            }
        },
        [onProductClick, product],
    );

    // Handle wishlist toggle
    const handleWishlistToggle = useCallback(
        (e: React.MouseEvent) => {
            e.stopPropagation();
            // TODO: Implement wishlist functionality
            console.log('Toggle wishlist for product:', product.id);
        },
        [product.id],
    );

    // Handle compare toggle
    const handleCompareToggle = useCallback(
        (e: React.MouseEvent) => {
            e.stopPropagation();
            // TODO: Implement compare functionality
            console.log('Toggle compare for product:', product.id);
        },
        [product.id],
    );

    // Render rating stars
    const renderRating = useCallback(() => {
        if (!showRating || !product.rating) return null;

        const stars = [];
        const fullStars = Math.floor(product.rating);
        const hasHalfStar = product.rating % 1 >= 0.5;

        for (let i = 0; i < 5; i++) {
            if (i < fullStars) {
                stars.push(
                    <span
                        key={i}
                        className={styles['product-card__rating-star']}
                        aria-hidden="true"
                    >
                        ★
                    </span>,
                );
            } else if (i === fullStars && hasHalfStar) {
                stars.push(
                    <span
                        key={i}
                        className={styles['product-card__rating-star']}
                        aria-hidden="true"
                    >
                        ☆
                    </span>,
                );
            } else {
                stars.push(
                    <span
                        key={i}
                        className={`${styles['product-card__rating-star']} ${styles['product-card__rating-star--empty']}`}
                        aria-hidden="true"
                    >
                        ☆
                    </span>,
                );
            }
        }

        return (
            <div className={styles['product-card__rating']}>
                <div
                    className={styles['product-card__rating-stars']}
                    role="img"
                    aria-label={`${product.rating} out of 5 stars`}
                >
                    {stars}
                </div>
                <span className={styles['product-card__rating-text']}>
                    {product.rating} ({product.reviewCount ?? 0} reviews)
                </span>
            </div>
        );
    }, [showRating, product.rating, product.reviewCount]);

    // Render stock status
    const renderStockStatus = useCallback(() => {
        if (product.inStock === undefined) return null;

        let statusClass = 'product-card__stock-status--in-stock';
        let statusText = 'In Stock';

        if (product.inStock === false) {
            statusClass = 'product-card__stock-status--out-of-stock';
            statusText = 'Out of Stock';
        }

        return (
            <div className={`${styles['product-card__stock-status']} ${statusClass}`}>
                {statusText}
            </div>
        );
    }, [product.inStock]);

    // Render tags
    const renderTags = useCallback(() => {
        if (!product.tags || product.tags.length === 0) return null;

        return (
            <div className={styles['product-card__tags']}>
                {product.tags.slice(0, 2).map((tag, index) => (
                    <span key={index} className={styles['product-card__tag']}>
                        {tag}
                    </span>
                ))}
            </div>
        );
    }, [product.tags]);

    // Render specifications (detailed variant)
    const renderSpecifications = useCallback(() => {
        if (variant !== 'detailed' || !product.specifications) return null;

        return (
            <div className={styles['product-card__specifications']}>
                <ul className={styles['product-card__spec-list']}>
                    {Object.entries(product.specifications)
                        .slice(0, 3)
                        .map(([key, value]) => (
                            <li key={key} className={styles['product-card__spec-item']}>
                                <span className={styles['product-card__spec-label']}>{key}:</span>
                                <span className={styles['product-card__spec-value']}>{value}</span>
                            </li>
                        ))}
                </ul>
            </div>
        );
    }, [variant, product.specifications]);

    return (
        <article
            className={`${styles['product-card']} ${styles[`product-card--${variant}`]} ${className}`}
            onClick={handleProductClick}
            role="button"
            tabIndex={0}
            onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleProductClick();
                }
            }}
            aria-label={`View details for ${product.name}`}
        >
            {/* Stock status and tags */}
            {renderStockStatus()}
            {renderTags()}

            {/* Product image */}
            <div className={styles['product-card__image-container']}>
                <ProductCatalogImageGallery
                    images={[
                        {
                            id: 1,
                            src: product.image,
                            alt: product.name,
                            type: 'main' as const,
                        },
                    ]}
                    selectedImage={0}
                    onImageSelect={() => {}}
                    onImageClick={handleImageClick}
                    className={styles['product-card__image']}
                />
            </div>

            {/* Product content */}
            <div className={styles['product-card__content']}>
                <div className={styles['product-card__header']}>
                    <h3 className={styles['product-card__title']} title={product.name}>
                        {formattedName}
                    </h3>
                    <p className={styles['product-card__description']}>{product.description}</p>
                </div>

                {/* Rating */}
                {renderRating()}

                {/* Price */}
                <div className={styles['product-card__price']}>{formattedPrice}</div>

                {/* Specifications (detailed variant) */}
                {renderSpecifications()}

                {/* Actions */}
                <div className={styles['product-card__actions']}>
                    <Button
                        className={styles['product-card__primary-action']}
                        type="primary"
                        icon={<ShoppingCartOutlined />}
                        onClick={handleAddToCart}
                        disabled={product.inStock === false}
                        aria-label={`Add ${product.name} to cart`}
                    >
                        {product.inStock === false ? 'Out of Stock' : 'Add to Cart'}
                    </Button>

                    {showQuickActions && (
                        <div className={styles['product-card__secondary-actions']}>
                            <Button
                                className={styles['product-card__secondary-action']}
                                icon={<EyeOutlined />}
                                onClick={handleQuickView}
                                aria-label={`Quick view ${product.name}`}
                                title="Quick View"
                            />
                            <Button
                                className={styles['product-card__secondary-action']}
                                icon={<HeartOutlined />}
                                onClick={handleWishlistToggle}
                                aria-label={`Add ${product.name} to wishlist`}
                                title="Add to Wishlist"
                            />
                            <Button
                                className={styles['product-card__secondary-action']}
                                icon={<SwapOutlined />}
                                onClick={handleCompareToggle}
                                aria-label={`Compare ${product.name}`}
                                title="Compare"
                            />
                        </div>
                    )}
                </div>
            </div>
        </article>
    );
};

export default ProductCard;
