import type React from 'react';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

// Import ProductCatalog component
import ProductCatalog from '../ProductCatalog';
import type { Product } from '../ProductCatalog/types/product-catalog.types';
// Import LineArray data
import { lineArrayProducts } from './data';

const LineArrayPage: React.FC = () => {
    const navigate = useNavigate();

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

    return (
        <div className="line-array-page">
            {/* Product Catalog - includes its own breadcrumbs */}
            <ProductCatalog
                initialCategories={lineArrayProducts}
                productsPerPage={6}
                onProductClick={handleProductClick}
                onAddToCart={handleAddToCart}
            />
        </div>
    );
};

export default LineArrayPage;
