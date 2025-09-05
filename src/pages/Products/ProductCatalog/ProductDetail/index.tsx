import type React from 'react';
import { useCallback, useMemo } from 'react';

import { Col, Row } from 'antd';

// Import breadcrumbs
import Breadcrumbs from '@/components/common/Breadcrumbs';

import { useBreadcrumbs } from '../../hooks/useBreadcrumbs';
// Import modular components
import ProductImageGallery from '../components/ProductImageGallery';
import ProductInfo from '../components/ProductInfo';
// Import types and data
import { productDetailData } from '../data/product-detail.data';
// Import hooks and utilities
import { useProductDetail } from '../hooks/useProductDetail';
import type { ProductDetailProps } from '../types/product-detail.types';
// Import styles
import './ProductDetail.scss';

const ProductDetail: React.FC<ProductDetailProps> = ({
    productId: _productId,
    onProductClick,
    onAddToCart,
    onAddToWishlist,
    onShare,
}) => {
    // For now, we'll use the mock data. In a real app, this would fetch based on productId
    const product = useMemo(() => productDetailData, []);

    // Generate breadcrumbs for product detail page
    // Use path-based generation since URL structure is /products/productId
    const { breadcrumbs, handleBreadcrumbClick } = useBreadcrumbs();

    // Use the product detail hook
    const {
        selectedImage,
        quantity,
        wishlist,
        actions,
        // Exclude unused variables
        selectedDispersion,
        selectedAccessories,
        ...rest
    } = useProductDetail(product, {
        productId: _productId,
        onProductClick,
        onAddToCart,
        onAddToWishlist,
        onShare,
    });

    // Suppress unused variable warnings for variables we'll use later
    void selectedDispersion;
    void selectedAccessories;
    void rest;

    // Handle product click
    const handleProductClick = useCallback(() => {
        if (onProductClick && product) {
            onProductClick(product);
        }
    }, [onProductClick, product]);

    // Handle add to cart
    const handleAddToCart = useCallback(() => {
        actions.addToCart();
    }, [actions]);

    // Handle add to wishlist
    const handleAddToWishlist = useCallback(() => {
        actions.toggleWishlist();
    }, [actions]);

    // Handle share
    const handleShare = useCallback(() => {
        actions.share();
    }, [actions]);

    // Handle quantity change
    const handleQuantityChange = useCallback(
        (newQuantity: number) => {
            actions.setQuantity(newQuantity);
        },
        [actions],
    );

    // Handle image selection
    const handleImageSelect = useCallback(
        (index: number) => {
            actions.setSelectedImage(index);
        },
        [actions],
    );

    if (!product) {
        return (
            <div className="product-detail-page">
                <div className="container">
                    {/* Breadcrumbs */}
                    <Breadcrumbs
                        items={breadcrumbs}
                        onItemClick={handleBreadcrumbClick}
                        variant="default"
                        separator="chevron"
                    />

                    <div className="product-detail__error">
                        <h2>Product not found</h2>
                        <p>The requested product could not be found.</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="product-detail-page">
            {/* Breadcrumbs */}
            <div className="container">
                <Breadcrumbs
                    items={breadcrumbs}
                    onItemClick={handleBreadcrumbClick}
                    variant="default"
                    separator="chevron"
                />
            </div>

            {/* Hero Section */}
            <section className="product-detail__hero">
                <div className="container">
                    <Row gutter={[32, 32]} align="top">
                        {/* Image Gallery */}
                        <Col xs={24} lg={14}>
                            <ProductImageGallery
                                images={product.images}
                                selectedImage={selectedImage}
                                onImageSelect={handleImageSelect}
                                onImageClick={handleProductClick}
                                showThumbnails={true}
                                showContextGallery={true}
                                showToolbar={true}
                            />
                        </Col>

                        {/* Product Info & Purchase */}
                        <Col xs={24} lg={10}>
                            <ProductInfo
                                product={product}
                                quantity={quantity}
                                onQuantityChange={handleQuantityChange}
                                onAddToCart={handleAddToCart}
                                onAddToWishlist={handleAddToWishlist}
                                onShare={handleShare}
                                wishlist={wishlist}
                                showTrustSignals={true}
                                showKeyFeatures={true}
                                showStockAlert={true}
                                variant="default"
                            />
                        </Col>
                    </Row>
                </div>
            </section>

            {/* Additional sections will be added here as we create more components */}
            {/* For now, we have the basic product display working */}
        </div>
    );
};

export default ProductDetail;
