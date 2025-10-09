import type React from 'react';
import { lazy, Suspense, useCallback, useMemo, useState } from 'react';

// Breadcrumbs are now handled by parent pages

// Import types and data
import { productDetailData } from '../data/product-detail.data';
// Import hooks and utilities
import { useProductDetail } from '../hooks/useProductDetail';
import type { ProductDetailProps } from '../types/product-detail.types';
// Import critical components (HeroSection loads immediately)
import { ErrorState, HeroSection } from './components';
// Import lazy loading components
import LazyLoadWrapper from './components/LazyLoadWrapper';
// Import styles
import styles from './ProductDetail.module.scss';

// Lazy load non-critical components - Simplified imports
const DispersionShowcase = lazy(() => import('./components/DispersionShowcase/index'));
const ProductUseCases = lazy(() => import('./components/ProductUseCases/index'));
const ResourceHub = lazy(() => import('./components/ResourceHub/index'));
const ReviewsQA = lazy(() => import('./components/ReviewsQA/index'));
const SystemBuilder = lazy(() => import('./components/SystemBuilder/index'));
const TechnicalSpecifications = lazy(() => import('./components/TechnicalSpecifications/index'));

const ProductDetail: React.FC<ProductDetailProps> = ({
    productId: _productId,
    onProductClick,
    onAddToCart,
    onAddToWishlist,
    onShare,
}) => {
    // For now, we'll use the mock data. In a real app, this would fetch based on productId
    const product = useMemo(() => productDetailData, []);

    // Use the product detail hook
    const { selectedImage, quantity, wishlist, actions, selectedDispersion } = useProductDetail(
        product,
        {
            productId: _productId,
            onProductClick,
            onAddToCart,
            onAddToWishlist,
            onShare,
        },
    );

    // State for technical specifications
    const [specsLoading, setSpecsLoading] = useState(false);
    const [specsError, setSpecsError] = useState(false);

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
        (newQuantity: number | null) => {
            if (newQuantity !== null) {
                actions.setQuantity(newQuantity);
            }
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

    // Handle dispersion change
    const handleDispersionChange = useCallback(
        (angle: number) => {
            actions.setSelectedDispersion(angle);
        },
        [actions],
    );

    // Handle accessory selection
    const handleAddToSystem = useCallback(
        (accessoryId: string) => {
            actions.toggleAccessory(accessoryId);
        },
        [actions],
    );

    const handleRemoveFromSystem = useCallback(
        (accessoryId: string) => {
            actions.toggleAccessory(accessoryId);
        },
        [actions],
    );

    // Handle downloads
    const handleDownloadSpecs = useCallback(() => {
        // Implementation for downloading specifications
        console.log('Downloading specifications...');
    }, []);

    const handleDownloadResource = useCallback((resourceId: number) => {
        // Implementation for downloading resources
        console.log('Downloading resource:', resourceId);
    }, []);

    // Handle support actions
    const handleContactSupport = useCallback(() => {
        // Implementation for contacting support
        console.log('Contacting support...');
    }, []);

    // Handle Q&A actions
    const handleAskQuestion = useCallback(() => {
        // Implementation for asking questions
        console.log('Asking question...');
    }, []);

    const handleHelpfulReview = useCallback((reviewId: number) => {
        // Implementation for marking review as helpful
        console.log('Marking review as helpful:', reviewId);
    }, []);

    const handleHelpfulAnswer = useCallback((qaId: number) => {
        // Implementation for marking answer as helpful
        console.log('Marking answer as helpful:', qaId);
    }, []);

    // Transform ProductAccessory[] to Accessory[] for SystemBuilder
    const transformedAccessories = useMemo(() => {
        return product.accessories.map(accessory => ({
            id: accessory.id,
            name: accessory.name,
            price: accessory.price,
            image: accessory.image,
            description: accessory.description,
            compatible: accessory.compatible,
            recommended: accessory.recommended,
            category: 'Audio Accessories', // Default category
            features: [], // Default empty features array
            inStock: true, // Default to in stock
        }));
    }, [product.accessories]);

    // Handle specifications retry
    const handleSpecsRetry = useCallback(() => {
        setSpecsError(false);
        setSpecsLoading(true);
        // Simulate loading
        setTimeout(() => {
            setSpecsLoading(false);
        }, 2000);
    }, []);

    if (!product) {
        return <ErrorState />;
    }

    return (
        <div className={styles['product-detail-page']}>
            {/* Breadcrumbs are handled by parent pages */}

            {/* Hero Section - Loads immediately */}
            <HeroSection
                product={product}
                selectedImage={selectedImage}
                quantity={quantity}
                wishlist={wishlist}
                onImageSelect={handleImageSelect}
                onProductClick={handleProductClick}
                onQuantityChange={handleQuantityChange}
                onAddToCart={handleAddToCart}
                onAddToWishlist={handleAddToWishlist}
                onShare={handleShare}
            />

            {/* Dispersion Showcase Section - Lazy loaded */}
            <LazyLoadWrapper fallback="optimized">
                <Suspense fallback={<div>Loading dispersion showcase...</div>}>
                    <DispersionShowcase
                        dispersionConfigs={product.dispersionConfigs}
                        selectedDispersion={selectedDispersion}
                        onDispersionChange={handleDispersionChange}
                    />
                </Suspense>
            </LazyLoadWrapper>

            {/* Technical Specifications Section - Lazy loaded */}
            <LazyLoadWrapper
                fallback="skeleton"
                skeletonConfig={{ rows: 8, title: true, paragraph: true }}
            >
                <Suspense fallback={<div>Loading technical specifications...</div>}>
                    <TechnicalSpecifications
                        specifications={product.specifications}
                        onDownloadSpecs={handleDownloadSpecs}
                        isLoading={specsLoading}
                        hasError={specsError}
                        onRetry={handleSpecsRetry}
                    />
                </Suspense>
            </LazyLoadWrapper>

            {/* Applications Gallery Section - Lazy loaded */}
            <LazyLoadWrapper fallback="optimized">
                <Suspense fallback={<div>Loading product use cases...</div>}>
                    <ProductUseCases applications={product.applications} />
                </Suspense>
            </LazyLoadWrapper>

            {/* System Builder Section - Lazy loaded */}
            <LazyLoadWrapper
                fallback="skeleton"
                skeletonConfig={{ rows: 5, title: true, paragraph: true }}
            >
                <Suspense fallback={<div>Loading system builder...</div>}>
                    <SystemBuilder
                        accessories={transformedAccessories}
                        onAddToSystem={handleAddToSystem}
                        onRemoveFromSystem={handleRemoveFromSystem}
                    />
                </Suspense>
            </LazyLoadWrapper>

            {/* Reviews & Q&A Section - Lazy loaded */}
            <LazyLoadWrapper
                fallback="skeleton"
                skeletonConfig={{ rows: 6, title: true, paragraph: true }}
            >
                <Suspense fallback={<div>Loading reviews and Q&A...</div>}>
                    <ReviewsQA
                        reviews={product.reviews}
                        qa={product.qa}
                        rating={product.rating}
                        reviewCount={product.reviewCount}
                        onAskQuestion={handleAskQuestion}
                        onHelpfulReview={handleHelpfulReview}
                        onHelpfulAnswer={handleHelpfulAnswer}
                    />
                </Suspense>
            </LazyLoadWrapper>

            {/* Resource Hub Section - Lazy loaded */}
            <LazyLoadWrapper
                fallback="skeleton"
                skeletonConfig={{ rows: 4, title: true, paragraph: true }}
            >
                <Suspense fallback={<div>Loading resource hub...</div>}>
                    <ResourceHub
                        resources={product.resources}
                        onDownload={handleDownloadResource}
                        onContactSupport={handleContactSupport}
                    />
                </Suspense>
            </LazyLoadWrapper>
        </div>
    );
};

export default ProductDetail;
