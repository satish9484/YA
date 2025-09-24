import type React from 'react';

import { Col, Row } from 'antd';

import type { ProductDetail } from '../../../types/product-detail.types';
// import ProductImageGallery from '../ProductImageGallery'; // Temporarily disabled for performance testing
import ProductInfo from '../ProductInfo';
import styles from './HeroSection.module.scss';

interface HeroSectionProps {
    product: ProductDetail;
    selectedImage: number;
    quantity: number;
    wishlist: boolean;
    onImageSelect: (imageId: number) => void;
    onProductClick: (productId: string) => void;
    onQuantityChange: (value: number | null) => void;
    onAddToCart: () => void;
    onAddToWishlist: () => void;
    onShare: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({
    product,
    selectedImage: _selectedImage,
    quantity,
    wishlist,
    onImageSelect: _onImageSelect,
    onProductClick: _onProductClick,
    onQuantityChange,
    onAddToCart,
    onAddToWishlist,
    onShare,
}) => {
    return (
        <section className={styles['hero-section']}>
            <div className={styles.container}>
                <Row gutter={[32, 32]} align="top">
                    {/* Image Gallery - TEMPORARILY DISABLED FOR PERFORMANCE TESTING */}
                    <Col xs={24} lg={14}>
                        <div
                            style={{
                                height: '500px',
                                background: '#f8f9fa',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                border: '2px dashed #dee2e6',
                                borderRadius: '8px',
                            }}
                        >
                            <div style={{ textAlign: 'center', color: '#6c757d' }}>
                                <h3>Image Gallery Disabled</h3>
                                <p>Component temporarily disabled for performance testing</p>
                                <p>Images: {product.images?.length || 0} items</p>
                            </div>
                        </div>
                        {/* 
                        <ProductImageGallery
                            images={product.images}
                            selectedImage={selectedImage}
                            onImageSelect={onImageSelect}
                            onImageClick={() => onProductClick(product.id)}
                            showThumbnails={true}
                            showContextGallery={true}
                            showToolbar={true}
                        />
                        */}
                    </Col>

                    {/* Product Info & Purchase */}
                    <Col xs={24} lg={10}>
                        <ProductInfo
                            product={product}
                            quantity={quantity}
                            onQuantityChange={onQuantityChange}
                            onAddToCart={() => onAddToCart()}
                            onAddToWishlist={() => onAddToWishlist()}
                            onShare={() => onShare()}
                            wishlist={wishlist}
                        />
                    </Col>
                </Row>
            </div>
        </section>
    );
};

export default HeroSection;
