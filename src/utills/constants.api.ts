// ENV CONSTANTS (Vite style)
// Ensure you have VITE_REACT_APP_API_BASE and VITE_REACT_APP_NAME in your .env file

export const API_PORT: string = import.meta.env['VITE_REACT_APP_API_PORT'] ?? '8080';
export const API_BASE: string = 'http://localhost:8002';
export const APP_NAME: string = import.meta.env['VITE_REACT_APP_NAME'] ?? 'MyApp';
console.log(API_BASE);

// LOCALSTORAGE KEYNAME
export const LS_USER = `user${APP_NAME}`;
export const LS_AUTHTOKEN = `authToken${APP_NAME}`;

// TYPES FOR REDUCER
export const LOGIN_S = `LOGIN_S`;
export const LOGIN_F = `LOGIN_F`;

export const USER_LIST_S = `USER_LIST_S`;
export const USER_LIST_F = `USER_LIST_F`;

export const USER_INFO_S = `USER_INFO_S`;
export const USER_INFO_F = `USER_INFO_F`;

// Line Array Products Types
export const PRODUCT_LIST_S = `PRODUCT_LIST_S`;
export const PRODUCT_LIST_F = `PRODUCT_LIST_F`;

export const PRODUCT_INFO_S = `PRODUCT_INFO_S`;
export const PRODUCT_INFO_F = `PRODUCT_INFO_F`;

export const PRODUCT_CREATE_S = `PRODUCT_CREATE_S`;
export const PRODUCT_CREATE_F = `PRODUCT_CREATE_F`;

export const PRODUCT_UPDATE_S = `PRODUCT_UPDATE_S`;
export const PRODUCT_UPDATE_F = `PRODUCT_UPDATE_F`;

export const PRODUCT_DELETE_S = `PRODUCT_DELETE_S`;
export const PRODUCT_DELETE_F = `PRODUCT_DELETE_F`;

// API ENDPOINTS
export const API_LOGIN = `admin/login`;
export const API_USER_LIST = `admin/userList`;
export const API_USER_INFO = `admin/userInfo`;

// Line Array Products API Endpoints
export const API_PRODUCT_LIST = `product/line-array`;
export const API_PRODUCT_INFO = `product/line-array`;
export const API_PRODUCT_CREATE = `product/line-array`;
export const API_PRODUCT_UPDATE = `product/line-array`;
export const API_PRODUCT_DELETE = `product/line-array`;

// API Line Array Endpoints (versioned path but generic names)
export const API_LINE_ARRAY_LIST = `api/v1/products/line-array`;
export const API_LINE_ARRAY_SEARCH = `api/v1/products/line-array/search`;
export const API_LINE_ARRAY_CATEGORY = `api/v1/products/line-array/category`;
export const API_LINE_ARRAY_INFO = `api/v1/products/line-array`;
export const API_LINE_ARRAY_TEST = `api/v1/products/line-array/test`;
export const API_LINE_ARRAY_SEED = `api/v1/products/line-array/seed`;
