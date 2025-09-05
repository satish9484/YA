import type React from 'react';
import { useMemo } from 'react';

import Breadcrumbs from '@/components/common/Breadcrumbs';

import { generateCategoryPageBreadcrumbs } from '../../utils/breadcrumb.utils';
import type { CategoryBreadcrumbsProps } from './CategoryBreadcrumbs.types';

/**
 * CategoryBreadcrumbs Component
 *
 * Specialized breadcrumb component for category pages
 * Automatically generates appropriate breadcrumb trail for category context
 */
const CategoryBreadcrumbs: React.FC<CategoryBreadcrumbsProps> = ({
    categoryId,
    categoryName,
    className = '',
    variant = 'default',
    separator = 'chevron',
    onItemClick,
}) => {
    // Generate breadcrumbs for category page
    const breadcrumbs = useMemo(() => {
        return generateCategoryPageBreadcrumbs(categoryId, categoryName);
    }, [categoryId, categoryName]);

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

export default CategoryBreadcrumbs;
