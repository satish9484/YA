import { useCallback } from 'react';

import { useAppDispatch, useAppSelector } from '../hooks';
import type { LineArrayProduct, ProductFilters } from '../reducers/LineArrayProductsSlice';
import {
    clearError,
    clearProductInfo,
    createProduct,
    deleteProduct,
    getProductInfo,
    getProductList,
    resetFilters,
    selectError,
    selectFilteredProducts,
    selectFilters,
    selectIsLoading,
    selectPagination,
    selectProductInfo,
    selectProductList,
    selectSearchQuery,
    selectSorting,
    setFilters,
    setPagination,
    setSearchQuery,
    setSorting,
    updateProduct,
} from '../reducers/LineArrayProductsSlice';

// Custom hooks for line array products
export const useLineArrayProducts = () => {
    const dispatch = useAppDispatch();

    // Selectors
    const productList = useAppSelector(selectProductList);
    const productInfo = useAppSelector(selectProductInfo);
    const isLoading = useAppSelector(selectIsLoading);
    const error = useAppSelector(selectError);
    const filters = useAppSelector(selectFilters);
    const searchQuery = useAppSelector(selectSearchQuery);
    const sorting = useAppSelector(selectSorting);
    const pagination = useAppSelector(selectPagination);
    const filteredProducts = useAppSelector(selectFilteredProducts);

    // Actions
    const fetchProducts = useCallback(
        (params?: { page?: number; limit?: number; search?: string; filters?: ProductFilters }) => {
            dispatch(getProductList(params));
        },
        [dispatch],
    );

    const fetchProduct = useCallback(
        (productId: string) => {
            dispatch(getProductInfo(productId));
        },
        [dispatch],
    );

    const createNewProduct = useCallback(
        (productData: Omit<LineArrayProduct, '_id' | 'createdAt' | 'updatedAt'>) => {
            return dispatch(createProduct(productData));
        },
        [dispatch],
    );

    const updateExistingProduct = useCallback(
        (productId: string, updateData: Partial<LineArrayProduct>) => {
            return dispatch(updateProduct(productId, updateData));
        },
        [dispatch],
    );

    const removeProduct = useCallback(
        (productId: string) => {
            return dispatch(deleteProduct(productId));
        },
        [dispatch],
    );

    const clearProductError = useCallback(() => {
        dispatch(clearError());
    }, [dispatch]);

    const clearCurrent = useCallback(() => {
        dispatch(clearProductInfo());
    }, [dispatch]);

    const updateFilters = useCallback(
        (newFilters: ProductFilters) => {
            dispatch(setFilters(newFilters));
        },
        [dispatch],
    );

    const updateSearchQuery = useCallback(
        (query: string) => {
            dispatch(setSearchQuery(query));
        },
        [dispatch],
    );

    const updateSorting = useCallback(
        (sortBy: 'price' | 'rating' | 'name' | 'createdAt', sortOrder: 'asc' | 'desc') => {
            dispatch(setSorting({ sortBy, sortOrder }));
        },
        [dispatch],
    );

    const updatePagination = useCallback(
        (page: number, limit?: number) => {
            dispatch(setPagination({ page, ...(limit !== undefined && { limit }) }));
        },
        [dispatch],
    );

    const resetAllFilters = useCallback(() => {
        dispatch(resetFilters());
    }, [dispatch]);

    return {
        // State
        productList,
        productInfo,
        filteredProducts,
        isLoading,
        error,
        filters,
        searchQuery,
        sorting,
        pagination,

        // Actions
        fetchProducts,
        fetchProduct,
        createNewProduct,
        updateExistingProduct,
        removeProduct,
        clearProductError,
        clearCurrent,
        updateFilters,
        updateSearchQuery,
        updateSorting,
        updatePagination,
        resetAllFilters,
    };
};

// Hook for product operations
export const useProductOperations = () => {
    const dispatch = useAppDispatch();

    const isLoading = useAppSelector(selectIsLoading);
    const error = useAppSelector(selectError);

    const createProductAsync = useCallback(
        async (productData: Omit<LineArrayProduct, '_id' | 'createdAt' | 'updatedAt'>) => {
            const result = await dispatch(createProduct(productData));
            return result;
        },
        [dispatch],
    );

    const updateProductAsync = useCallback(
        async (productId: string, updateData: Partial<LineArrayProduct>) => {
            const result = await dispatch(updateProduct(productId, updateData));
            return result;
        },
        [dispatch],
    );

    const deleteProductAsync = useCallback(
        async (productId: string) => {
            const result = await dispatch(deleteProduct(productId));
            return result;
        },
        [dispatch],
    );

    return {
        isLoading,
        error,
        createProductAsync,
        updateProductAsync,
        deleteProductAsync,
    };
};

// Hook for filtering and searching
export const useProductFilters = () => {
    const dispatch = useAppDispatch();

    const filters = useAppSelector(selectFilters);
    const searchQuery = useAppSelector(selectSearchQuery);
    const sorting = useAppSelector(selectSorting);
    const filteredProducts = useAppSelector(selectFilteredProducts);

    const setFiltersAction = useCallback(
        (newFilters: ProductFilters) => {
            dispatch(setFilters(newFilters));
        },
        [dispatch],
    );

    const setSearchQueryAction = useCallback(
        (query: string) => {
            dispatch(setSearchQuery(query));
        },
        [dispatch],
    );

    const setSortingAction = useCallback(
        (sortBy: 'price' | 'rating' | 'name' | 'createdAt', sortOrder: 'asc' | 'desc') => {
            dispatch(setSorting({ sortBy, sortOrder }));
        },
        [dispatch],
    );

    const resetFiltersAction = useCallback(() => {
        dispatch(resetFilters());
    }, [dispatch]);

    return {
        filters,
        searchQuery,
        sorting,
        filteredProducts,
        setFilters: setFiltersAction,
        setSearchQuery: setSearchQueryAction,
        setSorting: setSortingAction,
        resetFilters: resetFiltersAction,
    };
};
