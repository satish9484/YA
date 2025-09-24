import type React from 'react';

import Breadcrumbs, { useBreadcrumbs } from '@/components/common/Breadcrumbs';

import ProductDetail from './ProductDetail';

const ProductDetailPage: React.FC = () => {
    const { createProductBreadcrumbs } = useBreadcrumbs();

    // Generate breadcrumbs for the main product detail page
    const breadcrumbs = createProductBreadcrumbs('TOA HX-5B', 'toa-hx5b', 'line-array');

    return (
        <div>
            {/* Breadcrumbs */}
            <Breadcrumbs
                items={breadcrumbs}
                showHome={false}
                separator="→"
                className="product-detail-page-breadcrumbs"
            />

            {/* Product Detail Component */}
            <ProductDetail />
        </div>
    );
};

export default ProductDetailPage;
