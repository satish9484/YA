import type React from 'react';
import { useMemo } from 'react';
import { useParams } from 'react-router-dom';

// Import new simplified breadcrumbs
import Breadcrumbs, { useBreadcrumbs } from '@/components/common/Breadcrumbs';

// Import ProductDetail component
import ProductDetail from '../ProductCatalog/ProductDetail';
// Import LineArray data
import { lineArrayProducts } from './data';

// Import product detail data for TOA HX-5B
// import { productDetailData } from '../ProductCatalog/data/product-detail.data';

const LineArrayProductDetail: React.FC = () => {
    const { productId } = useParams<{ productId: string }>();
    const { createProductBreadcrumbs } = useBreadcrumbs();

    // Find the product in our LineArray data
    const product = useMemo(() => {
        if (!productId) return null;

        // First, try to find in LineArray products
        for (const category of lineArrayProducts) {
            const foundProduct = category.products.find(p => p.id === productId);
            if (foundProduct) {
                return foundProduct;
            }
        }

        // If not found, return null
        return null;
    }, [productId]);

    // Generate breadcrumbs for product detail page
    const breadcrumbs = useMemo(() => {
        if (!product) return [];
        return createProductBreadcrumbs(product.name, product.id, 'line-array');
    }, [product, createProductBreadcrumbs]);

    // For now, we'll use the detailed product data for TOA HX-5B
    // In a real app, this would be fetched based on productId
    // const detailedProduct = useMemo(() => {
    //     if (productId === 'toa-hx5b') {
    //         return productDetailData;
    //     }
    //     // For other products, we could create detailed data or return null
    //     return productDetailData; // Using as fallback for now
    // }, [productId]);

    // TODO: Implement product interaction handlers when needed
    // const handleProductClick = useCallback((product: any) => {
    //     console.log('Product clicked:', product);
    // }, []);

    // const handleAddToCart = useCallback((product: any, quantity: number) => {
    //     console.log('Added to cart:', product, 'quantity:', quantity);
    // }, []);

    // const handleAddToWishlist = useCallback((product: any) => {
    //     console.log('Added to wishlist:', product);
    // }, []);

    // const handleShare = useCallback((product: any) => {
    //     console.log('Shared product:', product);
    // }, []);

    if (!product) {
        return (
            <div className="line-array-product-detail">
                {/* Breadcrumbs */}
                <Breadcrumbs
                    items={breadcrumbs}
                    showHome={false}
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
                showHome={false}
                separator="→"
                className="line-array-product-detail-breadcrumbs"
            />

            {/* Product Detail */}
            <ProductDetail />
        </div>
    );
};

export default LineArrayProductDetail;
