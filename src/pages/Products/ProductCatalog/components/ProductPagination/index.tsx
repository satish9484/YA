import type React from 'react';
import { useCallback, useMemo } from 'react';

import { Pagination, theme } from 'antd';

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
    const { token } = theme.useToken();
    // Memoized pagination props with theme integration
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
            // Theme-aware styling
            style: {
                color: token.colorText,
                fontSize: token.fontSize,
            },
            // Enhanced accessibility
            'aria-label': 'Product pagination navigation',
        };

        if (showTotal) {
            return {
                ...baseProps,
                showTotal: (total: number, range: [number, number]) => (
                    <span style={{ color: token.colorTextSecondary, fontSize: token.fontSizeSM }}>
                        {`${range[0]}-${range[1]} of ${total} items`}
                    </span>
                ),
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
        token.colorText,
        token.colorTextSecondary,
        token.fontSize,
        token.fontSizeSM,
    ]);

    // Enhanced page change handler with analytics
    const handlePageChange = useCallback(
        (page: number) => {
            onPageChange(page);
            // Optional: Add analytics tracking here
            // analytics.track('pagination_page_change', { page, totalPages: pagination.totalPages });
        },
        [onPageChange],
    );

    // Enhanced page size change handler
    const handlePageSizeChange = useCallback(
        (current: number, size: number) => {
            if (onPageSizeChange) {
                onPageSizeChange(current, size);
                // Optional: Add analytics tracking here
                // analytics.track('pagination_size_change', { newSize: size, currentPage: current });
            }
        },
        [onPageSizeChange],
    );

    // Unified show size change handler
    const handleShowSizeChange = useCallback(
        (current: number, size: number) => {
            handlePageSizeChange(current, size);
        },
        [handlePageSizeChange],
    );

    // Enhanced container styles with theme integration
    const containerStyles = useMemo(
        () => ({
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: token.marginLG,
            padding: `${token.paddingMD} 0`,
            backgroundColor: token.colorBgContainer,
            borderRadius: token.borderRadius,
            // Responsive behavior
            ...(responsive && {
                '@media (max-width: 768px)': {
                    padding: `${token.paddingSM} 0`,
                    marginTop: token.marginMD,
                },
            }),
        }),
        [token, responsive],
    );

    // Don't render if there's only one page and hideOnSinglePage is true
    if (hideOnSinglePage && pagination.totalPages <= 1) {
        return null;
    }

    return (
        <div
            style={containerStyles}
            className={className}
            role="navigation"
            aria-label="Product pagination"
            data-testid="product-pagination"
        >
            <Pagination
                {...paginationProps}
                onChange={handlePageChange}
                onShowSizeChange={handleShowSizeChange}
                // Additional theme-aware props
                itemRender={(_, type, originalElement) => {
                    if (type === 'prev' || type === 'next') {
                        return <span style={{ color: token.colorText }}>{originalElement}</span>;
                    }
                    return originalElement;
                }}
            />
        </div>
    );
};

export default ProductPagination;
