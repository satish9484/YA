import type React from 'react';
import { useCallback, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// Import breadcrumbs
import Breadcrumbs from '@/components/common/Breadcrumbs';
import type { BreadcrumbItem } from '@/components/common/Breadcrumbs/types/breadcrumbs.types';

// Import ProductDetail component
import ProductDetail from '../ProductCatalog/ProductDetail';
import { generateProductDetailBreadcrumbs } from '../utils/breadcrumb.utils';
// Import LineArray data
import { lineArrayProducts } from './data';

// Import product detail data for TOA HX-5B
// import { productDetailData } from '../ProductCatalog/data/product-detail.data';

const LineArrayProductDetail: React.FC = () => {
    const { productId } = useParams<{ productId: string }>();
    const navigate = useNavigate();

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
    const breadcrumbs = useMemo((): BreadcrumbItem[] => {
        if (!product) return [];
        return generateProductDetailBreadcrumbs(
            product.id,
            product.name,
            'line-array',
            'Line Array Speakers',
        );
    }, [product]);

    // Handle breadcrumb click
    const handleBreadcrumbClick = useCallback(
        (item: BreadcrumbItem, _index: number) => {
            if (item.id === 'home') {
                navigate('/');
            } else if (item.id === 'products') {
                navigate('/products');
            } else if (item.id === 'line-array') {
                navigate('/products/line-array');
            }
            // For current product, do nothing
        },
        [navigate],
    );

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
                        <p>The requested LineArray product could not be found.</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="line-array-product-detail">
            {/* Breadcrumbs */}
            <div className="container">
                <Breadcrumbs
                    items={breadcrumbs}
                    onItemClick={handleBreadcrumbClick}
                    variant="default"
                    separator="chevron"
                />
            </div>

            {/* Product Detail */}
            <ProductDetail />
        </div>
    );
};

export default LineArrayProductDetail;
