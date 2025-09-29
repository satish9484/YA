import {
    API_LINE_ARRAY_CATEGORY,
    API_LINE_ARRAY_INFO,
    API_LINE_ARRAY_LIST,
    API_LINE_ARRAY_SEARCH,
    API_LINE_ARRAY_SEED,
    API_LINE_ARRAY_TEST,
    API_PRODUCT_CREATE,
    API_PRODUCT_DELETE,
    API_PRODUCT_INFO,
    API_PRODUCT_LIST,
    API_PRODUCT_UPDATE,
    PRODUCT_CREATE_F,
    PRODUCT_CREATE_S,
    PRODUCT_DELETE_F,
    PRODUCT_DELETE_S,
    PRODUCT_INFO_F,
    PRODUCT_INFO_S,
    PRODUCT_LIST_F,
    PRODUCT_LIST_S,
    PRODUCT_UPDATE_F,
    PRODUCT_UPDATE_S,
} from '@/utills/constants.api.ts';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

// Product Types
export interface ProductSpecifications {
    [key: string]: string;
}

export interface LineArrayProduct {
    _id: string;
    name: string;
    image: string;
    price: number;
    originalPrice?: number;
    description: string;
    category: string;
    categoryId: string;
    categoryName: string;
    inStock: boolean;
    stockCount: number;
    rating?: number;
    reviewCount: number;
    tags: string[];
    specifications: ProductSpecifications;
    brand: string;
    sku: string;
    warranty: string;
    createdAt: string;
    updatedAt: string;
}

export interface ProductFilters {
    category?: string;
    brand?: string;
    minPrice?: number;
    maxPrice?: number;
    inStock?: boolean;
    tags?: string[];
    rating?: number;
}

export interface LineArrayProductsState {
    productList: LineArrayProduct[];
    productInfo: LineArrayProduct | null;
    isLoading: boolean;
    error: string | null;
    filters: ProductFilters;
    searchQuery: string;
    sortBy: 'price' | 'rating' | 'name' | 'createdAt';
    sortOrder: 'asc' | 'desc';
    pagination: {
        currentPage: number;
        totalPages: number;
        totalItems: number;
        itemsPerPage: number;
    };
}

const initialState: LineArrayProductsState = {
    productList: [],
    productInfo: null,
    isLoading: false,
    error: null,
    filters: {},
    searchQuery: '',
    sortBy: 'name',
    sortOrder: 'asc',
    pagination: {
        currentPage: 1,
        totalPages: 1,
        totalItems: 0,
        itemsPerPage: 10,
    },
};

// Action Creators following the same pattern as UserSlice
export const getProductList = (data: unknown) => ({
    type: 'API_CALL',
    payload: {
        url: API_PRODUCT_LIST,
        method: 'GET',
        data: data,
        hideLoader: false,
        success: (data: unknown) => ({
            type: PRODUCT_LIST_S,
            payload: data,
        }),
        error: () => ({
            type: PRODUCT_LIST_F,
            payload: [],
        }),
    },
});

// v1 endpoints
export const getLineArrayList = (params?: { page?: number; limit?: number }) => ({
    type: 'API_CALL',
    payload: {
        url: API_LINE_ARRAY_LIST,
        method: 'GET',
        data: params ?? {},
        hideLoader: false,
        success: (data: unknown) => ({
            type: PRODUCT_LIST_S,
            payload: data,
        }),
        error: () => ({
            type: PRODUCT_LIST_F,
            payload: [],
        }),
    },
});

export const searchLineArray = (query: { q: string }) => ({
    type: 'API_CALL',
    payload: {
        url: API_LINE_ARRAY_SEARCH,
        method: 'GET',
        data: query,
        hideLoader: false,
        success: (data: unknown) => ({
            type: PRODUCT_LIST_S,
            payload: data,
        }),
        error: () => ({
            type: PRODUCT_LIST_F,
            payload: [],
        }),
    },
});

export const getLineArrayByCategory = (category: string) => ({
    type: 'API_CALL',
    payload: {
        url: `${API_LINE_ARRAY_CATEGORY}/${encodeURIComponent(category)}`,
        method: 'GET',
        data: {},
        hideLoader: false,
        success: (data: unknown) => ({
            type: PRODUCT_LIST_S,
            payload: data,
        }),
        error: () => ({
            type: PRODUCT_LIST_F,
            payload: [],
        }),
    },
});

export const getLineArrayInfo = (id: string) => ({
    type: 'API_CALL',
    payload: {
        url: `${API_LINE_ARRAY_INFO}/${id}`,
        method: 'GET',
        data: {},
        hideLoader: false,
        success: (data: unknown) => ({
            type: PRODUCT_INFO_S,
            payload: data,
        }),
        error: () => ({
            type: PRODUCT_INFO_F,
            payload: null,
        }),
    },
});

export const testLineArray = () => ({
    type: 'API_CALL',
    payload: {
        url: API_LINE_ARRAY_TEST,
        method: 'GET',
        data: {},
        hideLoader: true,
        success: (data: unknown) => ({
            type: PRODUCT_LIST_S,
            payload: data,
        }),
        error: () => ({
            type: PRODUCT_LIST_F,
            payload: [],
        }),
    },
});

export const seedLineArray = () => ({
    type: 'API_CALL',
    payload: {
        url: API_LINE_ARRAY_SEED,
        method: 'POST',
        data: {},
        hideLoader: false,
        success: (data: unknown) => ({
            type: PRODUCT_LIST_S,
            payload: data,
        }),
        error: () => ({
            type: PRODUCT_LIST_F,
            payload: [],
        }),
    },
});

export const getProductInfo = (productId: string) => ({
    type: 'API_CALL',
    payload: {
        url: `${API_PRODUCT_INFO}/${productId}`,
        method: 'GET',
        data: {},
        hideLoader: false,
        success: (data: unknown) => ({
            type: PRODUCT_INFO_S,
            payload: data,
        }),
        error: () => ({
            type: PRODUCT_INFO_F,
            payload: null,
        }),
    },
});

export const createProduct = (productData: Omit<LineArrayProduct, '_id' | 'createdAt' | 'updatedAt'>) => ({
    type: 'API_CALL',
    payload: {
        url: API_PRODUCT_CREATE,
        method: 'POST',
        data: productData,
        hideLoader: false,
        success: (data: unknown) => ({
            type: PRODUCT_CREATE_S,
            payload: data,
        }),
        error: () => ({
            type: PRODUCT_CREATE_F,
            payload: null,
        }),
    },
});

export const updateProduct = (productId: string, updateData: Partial<LineArrayProduct>) => ({
    type: 'API_CALL',
    payload: {
        url: `${API_PRODUCT_UPDATE}/${productId}`,
        method: 'PUT',
        data: updateData,
        hideLoader: false,
        success: (data: unknown) => ({
            type: PRODUCT_UPDATE_S,
            payload: data,
        }),
        error: () => ({
            type: PRODUCT_UPDATE_F,
            payload: null,
        }),
    },
});

export const deleteProduct = (productId: string) => ({
    type: 'API_CALL',
    payload: {
        url: `${API_PRODUCT_DELETE}/${productId}`,
        method: 'DELETE',
        data: {},
        hideLoader: false,
        success: (data: unknown) => ({
            type: PRODUCT_DELETE_S,
            payload: data,
        }),
        error: () => ({
            type: PRODUCT_DELETE_F,
            payload: null,
        }),
    },
});

// Reducer
const lineArrayProductsSlice = createSlice({
    name: 'lineArrayProducts',
    initialState: initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        clearProductInfo: (state) => {
            state.productInfo = null;
        },
        setFilters: (state, action: PayloadAction<ProductFilters>) => {
            state.filters = action.payload;
        },
        setSearchQuery: (state, action: PayloadAction<string>) => {
            state.searchQuery = action.payload;
        },
        setSorting: (state, action: PayloadAction<{ sortBy: 'price' | 'rating' | 'name' | 'createdAt'; sortOrder: 'asc' | 'desc' }>) => {
            state.sortBy = action.payload.sortBy;
            state.sortOrder = action.payload.sortOrder;
        },
        setPagination: (state, action: PayloadAction<{ page: number; limit?: number }>) => {
            state.pagination.currentPage = action.payload.page;
            if (action.payload.limit) {
                state.pagination.itemsPerPage = action.payload.limit;
            }
        },
        resetFilters: (state) => {
            state.filters = {};
            state.searchQuery = '';
            state.sortBy = 'name';
            state.sortOrder = 'asc';
            state.pagination.currentPage = 1;
        },
    },
    extraReducers: builder => {
        // Product List Actions
        builder.addCase(PRODUCT_LIST_S as string, (state, action: PayloadAction<unknown>) => {
            const response = action.payload as { data: LineArrayProduct[]; total?: number; page?: number; limit?: number };
            console.log('LineArrayProducts: LIST_SUCCESS', response);
            state.productList = response.data;
            state.pagination.totalItems = response.total || response.data.length;
            state.pagination.totalPages = Math.ceil(state.pagination.totalItems / state.pagination.itemsPerPage);
            if (response.page) state.pagination.currentPage = response.page;
            if (response.limit) state.pagination.itemsPerPage = response.limit;
            state.error = null;
        });
        builder.addCase(PRODUCT_LIST_F as string, (state) => {
            state.productList = [];
            state.error = 'Failed to fetch products';
        });

        // Product Info Actions
        builder.addCase(PRODUCT_INFO_S as string, (state, action: PayloadAction<unknown>) => {
            const response = action.payload as { data: LineArrayProduct };
            console.log('LineArrayProducts: INFO_SUCCESS', response);
            state.productInfo = response.data;
            state.error = null;
        });
        builder.addCase(PRODUCT_INFO_F as string, (state) => {
            state.productInfo = null;
            state.error = 'Failed to fetch product details';
        });

        // Product Create Actions
        builder.addCase(PRODUCT_CREATE_S as string, (state, action: PayloadAction<unknown>) => {
            const response = action.payload as { data: LineArrayProduct };
            state.productList.push(response.data);
            state.error = null;
        });
        builder.addCase(PRODUCT_CREATE_F as string, (state) => {
            state.error = 'Failed to create product';
        });

        // Product Update Actions
        builder.addCase(PRODUCT_UPDATE_S as string, (state, action: PayloadAction<unknown>) => {
            const response = action.payload as { data: LineArrayProduct };
            const index = state.productList.findIndex(product => product._id === response.data._id);
            if (index !== -1) {
                state.productList[index] = response.data;
            }
            if (state.productInfo?._id === response.data._id) {
                state.productInfo = response.data;
            }
            state.error = null;
        });
        builder.addCase(PRODUCT_UPDATE_F as string, (state) => {
            state.error = 'Failed to update product';
        });

        // Product Delete Actions
        builder.addCase(PRODUCT_DELETE_S as string, (state, action: PayloadAction<unknown>) => {
            const response = action.payload as { data: { _id: string } };
            state.productList = state.productList.filter(product => product._id !== response.data._id);
            if (state.productInfo?._id === response.data._id) {
                state.productInfo = null;
            }
            state.error = null;
        });
        builder.addCase(PRODUCT_DELETE_F as string, (state) => {
            state.error = 'Failed to delete product';
        });
    },
});

// Selectors
export const selectProductList = (state: { lineArrayProducts: LineArrayProductsState }) => state.lineArrayProducts.productList;
export const selectProductInfo = (state: { lineArrayProducts: LineArrayProductsState }) => state.lineArrayProducts.productInfo;
export const selectIsLoading = (state: { lineArrayProducts: LineArrayProductsState }) => state.lineArrayProducts.isLoading;
export const selectError = (state: { lineArrayProducts: LineArrayProductsState }) => state.lineArrayProducts.error;
export const selectFilters = (state: { lineArrayProducts: LineArrayProductsState }) => state.lineArrayProducts.filters;
export const selectSearchQuery = (state: { lineArrayProducts: LineArrayProductsState }) => state.lineArrayProducts.searchQuery;
export const selectSorting = (state: { lineArrayProducts: LineArrayProductsState }) => ({
    sortBy: state.lineArrayProducts.sortBy,
    sortOrder: state.lineArrayProducts.sortOrder,
});
export const selectPagination = (state: { lineArrayProducts: LineArrayProductsState }) => state.lineArrayProducts.pagination;

// Filtered Products Selector
export const selectFilteredProducts = (state: { lineArrayProducts: LineArrayProductsState }) => {
    const { productList, filters, searchQuery, sortBy, sortOrder } = state.lineArrayProducts;
    
    let filteredProducts = [...productList];

    // Apply search query
    if (searchQuery) {
        filteredProducts = filteredProducts.filter(product =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
        );
    }

    // Apply filters
    if (filters.category) {
        filteredProducts = filteredProducts.filter(product => product.category === filters.category);
    }
    if (filters.brand) {
        filteredProducts = filteredProducts.filter(product => product.brand === filters.brand);
    }
    if (filters.minPrice !== undefined) {
        filteredProducts = filteredProducts.filter(product => product.price >= filters.minPrice!);
    }
    if (filters.maxPrice !== undefined) {
        filteredProducts = filteredProducts.filter(product => product.price <= filters.maxPrice!);
    }
    if (filters.inStock !== undefined) {
        filteredProducts = filteredProducts.filter(product => product.inStock === filters.inStock);
    }
    if (filters.rating !== undefined) {
        filteredProducts = filteredProducts.filter(product => (product.rating || 0) >= filters.rating!);
    }

    // Apply sorting
    filteredProducts.sort((a, b) => {
        let aValue: any, bValue: any;
        
        switch (sortBy) {
            case 'price':
                aValue = a.price;
                bValue = b.price;
                break;
            case 'rating':
                aValue = a.rating || 0;
                bValue = b.rating || 0;
                break;
            case 'name':
                aValue = a.name.toLowerCase();
                bValue = b.name.toLowerCase();
                break;
            case 'createdAt':
                aValue = new Date(a.createdAt).getTime();
                bValue = new Date(b.createdAt).getTime();
                break;
            default:
                return 0;
        }

        if (sortOrder === 'asc') {
            return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
        } else {
            return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
        }
    });

    return filteredProducts;
};

// Export actions and reducer
export const {
    clearError,
    clearProductInfo,
    setFilters,
    setSearchQuery,
    setSorting,
    setPagination,
    resetFilters,
} = lineArrayProductsSlice.actions;

export default lineArrayProductsSlice.reducer;
