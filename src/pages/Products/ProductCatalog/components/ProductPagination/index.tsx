import type React from 'react';
import { useCallback, useMemo } from 'react';

import { Pagination } from 'antd';

import styles from './ProductPagination.module.scss';
import type { ProductPaginationComponentProps } from './ProductPagination.types';

/**
 * ProductPagination Component
 *
 * Custom pagination component for product listings
 * CRO-optimized for user experience and conversion
 */
const ProductPagination: React.FC<ProductPaginationComponentProps> = ({
    pagination,
    onPageChange,
    showTotal = true,
    showSizeChanger = true,
    pageSizeOptions = ['2', '4', '8', '12', '24'],
    className = '',
    size = 'default',
    showQuickJumper = false,
    showLessItems = false,
    hideOnSinglePage = true,
    responsive = true,
    onPageSizeChange,
}) => {
    // Memoized pagination props
    const paginationProps = useMemo(() => {
        const baseProps = {
            current: pagination.currentPage,
            total: pagination.totalItems,
            pageSize: pagination.pageSize,
            showSizeChanger,
            showQuickJumper,
            showLessItems,
            hideOnSinglePage,
            pageSizeOptions,
            size: size === 'large' ? 'default' : size,
            responsive,
        };

        if (showTotal) {
            return {
                ...baseProps,
                showTotal: (total: number, range: [number, number]) =>
                    `${range[0]}-${range[1]} of ${total} items`,
            };
        }

        return baseProps;
    }, [
        pagination.currentPage,
        pagination.totalItems,
        pagination.pageSize,
        showTotal,
        showSizeChanger,
        showQuickJumper,
        showLessItems,
        hideOnSinglePage,
        pageSizeOptions,
        size,
        responsive,
    ]);

    // Handle page change
    const handlePageChange = useCallback(
        (page: number) => {
            onPageChange(page);
        },
        [onPageChange],
    );

    // Handle page size change
    const handlePageSizeChange = useCallback(
        (current: number, size: number) => {
            if (onPageSizeChange) {
                onPageSizeChange(current, size);
            } else {
                console.log('Page size changed:', { current, size });
            }
        },
        [onPageSizeChange],
    );

    // Handle show size change
    const handleShowSizeChange = useCallback(
        (current: number, size: number) => {
            handlePageSizeChange(current, size);
        },
        [handlePageSizeChange],
    );

    // Generate class names using CSS modules
    const classNames = useMemo(() => {
        const classes = [styles['product-pagination']];

        if (className) classes.push(className);
        if (size !== 'default') classes.push(styles[`product-pagination--${size}`]);
        if (responsive) classes.push(styles['product-pagination--responsive']);

        return classes.join(' ');
    }, [className, size, responsive]);

    // Don't render if there's only one page and hideOnSinglePage is true
    if (hideOnSinglePage && pagination.totalPages <= 1) {
        return null;
    }

    return (
        <div className={classNames} role="navigation" aria-label="Product pagination">
            <Pagination
                {...paginationProps}
                onChange={handlePageChange}
                onShowSizeChange={handleShowSizeChange}
                className={styles['ant-pagination']}
            />
        </div>
    );
};

export default ProductPagination;
