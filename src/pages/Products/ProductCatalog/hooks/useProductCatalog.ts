import { useCallback, useMemo, useState } from 'react';

import type {
    ProductCatalogState,
    ProductCategory,
    UseProductCatalogReturn,
} from '../types/product-catalog.types';
import { validateProductCategory } from '../utils/product-catalog.utils';

/**
 * Custom hook for managing product catalog state and operations
 * Handles data loading, error states, and category management
 */
export const useProductCatalog = (
    initialCategories: ProductCategory[] = [],
): UseProductCatalogReturn => {
    const [state, setState] = useState<ProductCatalogState>({
        categories: initialCategories,
        pagination: {},
        loading: false,
        error: null,
    });

    const loadCategories = useCallback(async (): Promise<void> => {
        setState(prev => ({ ...prev, loading: true, error: null }));

        try {
            // Simulate API call - replace with actual API integration
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Validate categories
            const validCategories = initialCategories.filter(validateProductCategory);

            setState(prev => ({
                ...prev,
                categories: validCategories,
                loading: false,
                error: null,
            }));
        } catch (error) {
            setState(prev => ({
                ...prev,
                loading: false,
                error: error instanceof Error ? error.message : 'Failed to load categories',
            }));
        }
    }, [initialCategories]);

    const refreshCategory = useCallback(async (_categoryId: string): Promise<void> => {
        setState(prev => ({ ...prev, loading: true, error: null }));

        try {
            // Simulate API call for specific category
            await new Promise(resolve => setTimeout(resolve, 500));

            setState(prev => ({
                ...prev,
                loading: false,
                error: null,
            }));
        } catch (error) {
            setState(prev => ({
                ...prev,
                loading: false,
                error: error instanceof Error ? error.message : 'Failed to refresh category',
            }));
        }
    }, []);

    const setPageForCategory = useCallback((categoryId: string, page: number) => {
        setState(prev => ({
            ...prev,
            pagination: {
                ...prev.pagination,
                [categoryId]: {
                    ...prev.pagination[categoryId],
                    currentPage: page,
                },
            },
        }));
    }, []);

    const setPageSizeForCategory = useCallback((categoryId: string, size: number) => {
        setState(prev => ({
            ...prev,
            pagination: {
                ...prev.pagination,
                [categoryId]: {
                    ...prev.pagination[categoryId],
                    pageSize: size,
                    currentPage: 1, // Reset to first page when changing page size
                },
            },
        }));
    }, []);

    const actions = useMemo(
        () => ({
            loadCategories,
            refreshCategory,
            setPageForCategory,
            setPageSizeForCategory,
        }),
        [loadCategories, refreshCategory, setPageForCategory, setPageSizeForCategory],
    );

    return {
        state,
        actions,
    };
};
