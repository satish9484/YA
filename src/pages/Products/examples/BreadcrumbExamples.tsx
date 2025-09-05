import type React from 'react';

import Breadcrumbs from '@/components/common/Breadcrumbs';
import type { BreadcrumbItem } from '@/components/common/Breadcrumbs/types/breadcrumbs.types';

import CategoryBreadcrumbs from '../components/CategoryBreadcrumbs';
import ProductDetailBreadcrumbs from '../components/ProductDetailBreadcrumbs';
import { generateBreadcrumbsFromPath } from '../utils/breadcrumb.utils';

/**
 * BreadcrumbExamples Component
 *
 * Demonstrates different breadcrumb implementations for Products pages
 */
const BreadcrumbExamples: React.FC = () => {
    // Example breadcrumb data
    const productsPageBreadcrumbs = generateBreadcrumbsFromPath('/products');
    // const _categoryPageBreadcrumbs = generateBreadcrumbsFromPath('/products/line-array');
    const productDetailBreadcrumbs = generateBreadcrumbsFromPath('/products/line-array/toa-hx5b');

    const handleBreadcrumbClick = (item: BreadcrumbItem, index: number) => {
        console.log('Breadcrumb clicked:', item, 'at index:', index);
        // In a real app, you would navigate to the item.link
        if (item.link) {
            // navigate(item.link);
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
            <h1>Breadcrumb Examples for Products Pages</h1>

            {/* Products Page Breadcrumbs */}
            <section style={{ marginBottom: '40px' }}>
                <h2>Products Page Breadcrumbs</h2>
                <p>Breadcrumb trail for the main products catalog page.</p>
                <Breadcrumbs
                    items={productsPageBreadcrumbs}
                    onItemClick={handleBreadcrumbClick}
                    variant="default"
                    separator="chevron"
                />
            </section>

            {/* Category Page Breadcrumbs */}
            <section style={{ marginBottom: '40px' }}>
                <h2>Category Page Breadcrumbs</h2>
                <p>Breadcrumb trail for a specific product category page.</p>
                <CategoryBreadcrumbs
                    categoryId="line-array"
                    categoryName="Line Array Speakers"
                    onItemClick={handleBreadcrumbClick}
                    variant="default"
                    separator="arrow"
                />
            </section>

            {/* Product Detail Page Breadcrumbs */}
            <section style={{ marginBottom: '40px' }}>
                <h2>Product Detail Page Breadcrumbs</h2>
                <p>Breadcrumb trail for a specific product detail page.</p>
                <ProductDetailBreadcrumbs
                    productId="toa-hx5b"
                    productName="TOA HX-5B"
                    categoryId="line-array"
                    categoryName="Line Array Speakers"
                    onItemClick={handleBreadcrumbClick}
                    variant="detailed"
                    separator="chevron"
                />
            </section>

            {/* Different Variants */}
            <section style={{ marginBottom: '40px' }}>
                <h2>Different Breadcrumb Variants</h2>

                <div style={{ marginBottom: '20px' }}>
                    <h3>Compact Variant</h3>
                    <Breadcrumbs
                        items={productDetailBreadcrumbs}
                        onItemClick={handleBreadcrumbClick}
                        variant="compact"
                        separator="slash"
                    />
                </div>

                <div style={{ marginBottom: '20px' }}>
                    <h3>Detailed Variant</h3>
                    <Breadcrumbs
                        items={productDetailBreadcrumbs}
                        onItemClick={handleBreadcrumbClick}
                        variant="detailed"
                        separator="dot"
                    />
                </div>

                <div style={{ marginBottom: '20px' }}>
                    <h3>With Home Icon</h3>
                    <Breadcrumbs
                        items={productDetailBreadcrumbs}
                        onItemClick={handleBreadcrumbClick}
                        showHome={true}
                        separator="chevron"
                    />
                </div>

                <div style={{ marginBottom: '20px' }}>
                    <h3>Truncated (max 3 items)</h3>
                    <Breadcrumbs
                        items={productDetailBreadcrumbs}
                        onItemClick={handleBreadcrumbClick}
                        maxItems={3}
                        separator="arrow"
                    />
                </div>
            </section>

            {/* Usage Examples */}
            <section style={{ marginBottom: '40px' }}>
                <h2>Usage Examples</h2>

                <div style={{ marginBottom: '20px' }}>
                    <h3>In ProductCatalog Component</h3>
                    <pre style={{ background: '#f5f5f5', padding: '10px', borderRadius: '4px' }}>
                        {`import { useBreadcrumbs } from '../hooks/useBreadcrumbs';
import Breadcrumbs from '@/components/common/Breadcrumbs';

const ProductCatalog = () => {
    const { breadcrumbs, handleBreadcrumbClick } = useBreadcrumbs();
    
    return (
        <div>
            <Breadcrumbs
                items={breadcrumbs}
                onItemClick={handleBreadcrumbClick}
                variant="default"
                separator="chevron"
            />
            {/* Rest of component */}
        </div>
    );
};`}
                    </pre>
                </div>

                <div style={{ marginBottom: '20px' }}>
                    <h3>In ProductDetail Component</h3>
                    <pre style={{ background: '#f5f5f5', padding: '10px', borderRadius: '4px' }}>
                        {`import { useBreadcrumbs } from '../hooks/useBreadcrumbs';
import Breadcrumbs from '@/components/common/Breadcrumbs';

const ProductDetail = ({ product }) => {
    const { breadcrumbs, handleBreadcrumbClick } = useBreadcrumbs({
        productId: product.id,
        productName: product.name,
        categoryId: product.category.toLowerCase().replace(/\\s+/g, '-'),
        categoryName: product.category,
    });
    
    return (
        <div>
            <Breadcrumbs
                items={breadcrumbs}
                onItemClick={handleBreadcrumbClick}
                variant="default"
                separator="chevron"
            />
            {/* Rest of component */}
        </div>
    );
};`}
                    </pre>
                </div>
            </section>
        </div>
    );
};

export default BreadcrumbExamples;
