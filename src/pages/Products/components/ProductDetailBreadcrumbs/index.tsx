import type React from 'react';
import { useMemo } from 'react';

import Breadcrumbs from '@/components/common/Breadcrumbs';

import { generateProductDetailBreadcrumbs } from '../../utils/breadcrumb.utils';
import type { ProductDetailBreadcrumbsProps } from './ProductDetailBreadcrumbs.types';

/**
 * ProductDetailBreadcrumbs Component
 *
 * Specialized breadcrumb component for product detail pages
 * Automatically generates appropriate breadcrumb trail for product context
 */
const ProductDetailBreadcrumbs: React.FC<ProductDetailBreadcrumbsProps> = ({
    productId,
    productName,
    categoryId,
    categoryName,
    className = '',
    variant = 'default',
    separator = 'chevron',
    onItemClick,
}) => {
    // Generate breadcrumbs for product detail page
    const breadcrumbs = useMemo(() => {
        return generateProductDetailBreadcrumbs(productId, productName, categoryId, categoryName);
    }, [productId, productName, categoryId, categoryName]);

    return (
        <Breadcrumbs
            items={breadcrumbs}
            onItemClick={onItemClick ?? (() => {})}
            variant={variant}
            separator={separator}
            className={className}
        />
    );
};

export default ProductDetailBreadcrumbs;
