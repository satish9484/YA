import type React from 'react';

import { Col, Row } from 'antd';

import type { ProductDetail } from '../../../types/product-detail.types';
// Temporarily disabled for performance testing
import ProductDetailInfo from '../ProductDetailInfo';
import ProductPhotoGallery from '../ProductPhotoGallery';
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
    selectedImage: selectedImage,
    quantity,
    wishlist,
    onImageSelect: onImageSelect,
    onProductClick: onProductClick,
    onQuantityChange,
    onAddToCart,
    onAddToWishlist,
    onShare,
}) => {
    return (
        <section className={styles['hero-section']}>
            <div className="container">
                <Row gutter={[32, 32]} align="top">
                    {/* Image Gallery - TEMPORARILY DISABLED FOR PERFORMANCE TESTING */}
                    <Col xs={24} lg={14}>
                        <ProductPhotoGallery
                            images={product.images}
                            selectedImage={selectedImage}
                            onImageSelect={onImageSelect}
                            onImageClick={() => onProductClick(product.id)}
                            showThumbnails={true}
                            showContextGallery={true}
                            showToolbar={true}
                        />
                    </Col>

                    {/* Product Info & Purchase */}
                    <Col xs={24} lg={10}>
                        <ProductDetailInfo
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
