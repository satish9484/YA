import type React from 'react';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

// Import new simplified breadcrumbs
import Breadcrumbs, { useBreadcrumbs } from '@/components/common/Breadcrumbs';

// Import ProductCatalog component
import ProductCatalog from '../ProductCatalog';
import type { Product } from '../ProductCatalog/types/product-catalog.types';
// Import LineArray data
import { lineArrayProducts } from './data';
import styles from './LineArray.module.scss';

const LineArrayPage: React.FC = () => {
    const navigate = useNavigate();

    // Use breadcrumbs hook
    const { createCategoryBreadcrumbs } = useBreadcrumbs();

    // Handle product click - navigate to product detail page
    const handleProductClick = useCallback(
        (product: Product) => {
            navigate(`/products/line-array/${product.id}`);
        },
        [navigate],
    );

    // Handle add to cart
    const handleAddToCart = useCallback((product: Product) => {
        // TODO: Implement add to cart functionality
        console.log('Added to cart:', product);
    }, []);

    // Generate breadcrumbs for Line Array category page
    const breadcrumbs = createCategoryBreadcrumbs('Line Array Speakers', 'line-array', 'products');

    return (
        <div className={styles['line-array-page']}>
            {/* Breadcrumbs at the top of the page */}
            <Breadcrumbs
                items={breadcrumbs}
                showHome={false}
                separator="→"
                className="line-array-breadcrumbs"
            />

            {/* Product Catalog - without its own breadcrumbs */}
            <ProductCatalog
                initialCategories={lineArrayProducts}
                productsPerPage={6}
                onProductClick={handleProductClick}
                onAddToCart={handleAddToCart}
                showBreadcrumbs={false}
            />
        </div>
    );
};

export default LineArrayPage;
