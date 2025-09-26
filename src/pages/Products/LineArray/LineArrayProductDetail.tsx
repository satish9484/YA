import type React from 'react';
import { useMemo } from 'react';
import { useParams } from 'react-router-dom';

// Import new simplified breadcrumbs
import Breadcrumbs, { useBreadcrumbs } from '@/components/common/Breadcrumbs';

// Import ProductDetail component
import ProductDetail from '../ProductCatalog/ProductDetail';
// Import LineArray data
import { lineArrayProducts } from './data';

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
                separator=">"
                className="line-array-product-detail-breadcrumbs"
            />

            {/* Product Detail - Pass the found product data */}
            <ProductDetail
                productId={product.id}
                onProductClick={product => console.log('Product clicked:', product)}
                onAddToCart={(product, quantity) =>
                    console.log('Added to cart:', product, 'quantity:', quantity)
                }
                onAddToWishlist={product => console.log('Added to wishlist:', product)}
                onShare={product => console.log('Shared product:', product)}
            />
        </div>
    );
};

export default LineArrayProductDetail;
