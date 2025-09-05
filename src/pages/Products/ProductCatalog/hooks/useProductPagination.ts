import { useCallback, useMemo } from 'react';

import type { UseProductPaginationReturn } from '../types/product-catalog.types';
import { createPaginationState } from '../utils/product-catalog.utils';

/**
 * Custom hook for managing product pagination state
 * Provides pagination controls and state management
 */
export const useProductPagination = (
    totalItems: number,
    pageSize: number = 4,
    initialPage: number = 1,
): UseProductPaginationReturn => {
    const pagination = useMemo(
        () => createPaginationState(initialPage, pageSize, totalItems),
        [initialPage, pageSize, totalItems],
    );

    const setCurrentPage = useCallback((page: number) => {
        // This would typically be handled by the parent component
        // The hook provides the logic, parent manages the state
        console.log('Page changed to:', page);
    }, []);

    const setPageSize = useCallback((size: number) => {
        // This would typically be handled by the parent component
        console.log('Page size changed to:', size);
    }, []);

    const goToFirstPage = useCallback(() => {
        setCurrentPage(1);
    }, [setCurrentPage]);

    const goToLastPage = useCallback(() => {
        setCurrentPage(pagination.totalPages);
    }, [setCurrentPage, pagination.totalPages]);

    const canGoNext = useMemo(
        () => pagination.currentPage < pagination.totalPages,
        [pagination.currentPage, pagination.totalPages],
    );

    const canGoPrevious = useMemo(() => pagination.currentPage > 1, [pagination.currentPage]);

    return {
        pagination,
        setCurrentPage,
        setPageSize,
        goToFirstPage,
        goToLastPage,
        canGoNext,
        canGoPrevious,
    };
};
