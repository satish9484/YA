import type React from 'react';
import { useCallback, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

// Import new simplified breadcrumbs
import Breadcrumbs, { useBreadcrumbs } from '@/components/common/Breadcrumbs';

// Import ProductCatalog component
import ProductCatalog from '../ProductCatalog';
import type { Product } from '../ProductCatalog/types/product-catalog.types';
// Import LineArray data
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getLineArrayList, selectProductList } from '@/redux/reducers/LineArrayProductsSlice';
// Removed fallback demo data; rely solely on API results
import styles from './LineArray.module.scss';

const LineArrayPage: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const productList = useAppSelector(selectProductList);

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

    // On mount, fetch line-array products (fire-and-forget)
    useEffect(() => {
        dispatch(getLineArrayList({ page: 1, limit: 20 }));
    }, [dispatch]);

    // After data renders, print products
    // useEffect(() => {
    //     if (productList && productList.length) {
    //         console.log('LineArrayPage: rendered products', productList);
    //     }
    // }, [productList]);

    // Convert Redux productList -> ProductCatalog initialCategories
    const initialCategories = useMemo(() => {
        // If no data from API, do not show fallback demo data.
        // Return empty categories to trigger friendly empty state in ProductCatalog.
        if (!productList || !productList.length) return [];

        const top = productList.slice(0, 20).map(p => ({
            id: p._id,
            name: p.name,
            image: p.image,
            price: p.price,
            description: p.description,
            category: p.category,
            inStock: p.inStock,
            rating: p.rating ?? 0,
            reviewCount: p.reviewCount,
            tags: p.tags,
            specifications: p.specifications,
        }));

        return [
            {
                id: 'line-array-primary',
                name: 'Line Array Speakers',
                description: 'Primary Line Array Products',
                products: top,
                totalCount: top.length,
            },
            {
                id: 'line-array-secondary',
                name: 'Featured Line Arrays',
                description: 'Featured selection',
                products: top,
                totalCount: top.length,
            },
        ];
    }, [productList]);


    return (
        <div className={styles['line-array-page']}>
            {/* Breadcrumbs at the top of the page */}
            <Breadcrumbs
                items={breadcrumbs}
                showHome={false}
                separator="→"
                className="line-array-breadcrumbs"
            />

            {/* Product Catalog - prefer API data; fallback to static */}
            <ProductCatalog
                initialCategories={initialCategories}
                productsPerPage={8}
                onProductClick={handleProductClick}
                onAddToCart={handleAddToCart}
                showBreadcrumbs={false}
            />
        </div>
    );
};

export default LineArrayPage;
