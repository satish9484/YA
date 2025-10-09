import type React from 'react';
import { useCallback, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';

// Import new simplified breadcrumbs
import Breadcrumbs, { useBreadcrumbs } from '@/components/common/Breadcrumbs';
// Import Redux hooks and actions
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
    clearError,
    getLineArrayInfo,
    selectError,
    selectIsLoading,
    selectProductInfo,
} from '@/redux/reducers/LineArrayProductsSlice';

// Import ProductDetail component
import ProductDetail from '../ProductCatalog/ProductDetail';
import type { ProductDetail as ProductDetailType } from '../ProductCatalog/types/product-detail.types';

const LineArrayProductDetail: React.FC = () => {
    const { productId } = useParams<{ productId: string }>();
    const dispatch = useAppDispatch();
    const { createProductBreadcrumbs } = useBreadcrumbs();

    // Redux state
    const product = useAppSelector(selectProductInfo);
    const isLoading = useAppSelector(selectIsLoading);
    const error = useAppSelector(selectError);

    // Fetch product data when component mounts or productId changes
    useEffect(() => {
        if (productId) {
            // Clear any previous errors
            dispatch(clearError());
            // Fetch product data from API
            dispatch(getLineArrayInfo(productId));
        }
    }, [dispatch, productId]);

    // Transform API product data to ProductDetail format
    const transformedProduct = useMemo(() => {
        if (!product) return undefined;

        return {
            id: product._id,
            name: product.name,
            tagline: product.description,
            price: product.price,
            originalPrice: product.originalPrice ?? undefined,
            inStock: product.inStock,
            stockCount: product.stockCount,
            sku: product.sku,
            brand: product.brand,
            category: product.category,
            rating: product.rating ?? 0,
            reviewCount: product.reviewCount,
            warranty: product.warranty,
            images: [
                {
                    id: 1,
                    src: product.image,
                    alt: product.name,
                    type: 'main' as const,
                },
            ],
            dispersionConfigs: {},
            specifications: {
                performance: [],
                directivity: [],
                components: [],
                connections: [],
                physical: [],
            },
            applications: [],
            accessories: [],
            reviews: [],
            qa: [],
            resources: [],
        };
    }, [product]);

    // Generate breadcrumbs for product detail page
    const breadcrumbs = useMemo(() => {
        if (!product) return [];
        return createProductBreadcrumbs(product.name, product._id, 'line-array');
    }, [product, createProductBreadcrumbs]);

    // Handle product interactions
    const handleProductClick = useCallback((product: ProductDetailType) => {
        console.log('Product clicked:', product);
    }, []);

    const handleAddToCart = useCallback((product: ProductDetailType, quantity: number) => {
        console.log('Added to cart:', product, 'quantity:', quantity);
    }, []);

    const handleAddToWishlist = useCallback((product: ProductDetailType) => {
        console.log('Added to wishlist:', product);
    }, []);

    const handleShare = useCallback((product: ProductDetailType) => {
        console.log('Shared product:', product);
    }, []);

    // Loading state
    if (isLoading) {
        return (
            <div className="line-array-product-detail">
                <div className="container">
                    <div className="product-detail__loading">
                        <h2>Loading product...</h2>
                        <p>Please wait while we fetch the product details.</p>
                    </div>
                </div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="line-array-product-detail">
                {/* Breadcrumbs */}
                <Breadcrumbs
                    items={breadcrumbs}
                    separator="→"
                    className="line-array-product-detail-breadcrumbs"
                />

                <div className="container">
                    <div className="product-detail__error">
                        <h2>Error loading product</h2>
                        <p>{error}</p>
                        <button
                            onClick={() => productId && dispatch(getLineArrayInfo(productId))}
                            className="retry-button"
                        >
                            Retry
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Product not found state
    if (!product) {
        return (
            <div className="line-array-product-detail">
                {/* Breadcrumbs */}
                <Breadcrumbs
                    items={breadcrumbs}
                    separator="→"
                    className="line-array-product-detail-breadcrumbs"
                />

                <div className="container">
                    <div className="product-detail__error">
                        <h2>Product not found</h2>
                        <p>The requested LineArray product could not be found.</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="line-array-product-detail">
            {/* Breadcrumbs */}
            <Breadcrumbs
                items={breadcrumbs}
                separator="→"
                className="line-array-product-detail-breadcrumbs"
            />

            {/* Product Detail - Pass the fetched product data */}
            <ProductDetail
                productId={product._id}
                product={
                    transformedProduct
                        ? {
                              ...transformedProduct,
                              // Ensure originalPrice is always a number (fallback to 0 if undefined)
                              originalPrice: transformedProduct.originalPrice ?? 0,
                          }
                        : undefined
                }
                onProductClick={handleProductClick}
                onAddToCart={handleAddToCart}
                onAddToWishlist={handleAddToWishlist}
                onShare={handleShare}
            />
        </div>
    );
};

export default LineArrayProductDetail;
