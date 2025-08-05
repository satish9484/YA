// src/types/authTypes.ts

// Define API constants
export enum API_TYPE {
    API_LOGIN = '/auth/login',
    API_LOGOUT = '/auth/logout',
    API_CHANGE_PASSWORD = '/auth/change-password',
    API_FORGOT_PASSWORD = '/auth/forgot-password',
}

// Define action types
export enum ACTION_TYPE {
    API = 'API_CALL',
    LOGIN_SUCCESS = 'LOGIN_SUCCESS',
    LOGIN_FAIL = 'LOGIN_FAIL',
    LOGOUT_SUCCESS = 'LOGOUT_SUCCESS',
    LOGOUT_FAIL = 'LOGOUT_FAIL',
    CHANGE_PASSWORD_SUCCESS = 'CHANGE_PASSWORD_SUCCESS',
    CHANGE_PASSWORD_FAIL = 'CHANGE_PASSWORD_FAIL',
    FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS',
    FORGOT_PASSWORD_FAIL = 'FORGOT_PASSWORD_FAIL',
}

// Define common API payload structure for the middleware
export interface ApiActionPayload<
    TData = unknown,
    TSuccessPayload = unknown,
    TErrorPayload = unknown,
> {
    url: string;
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
    data?: TData;
    success?: (data: TSuccessPayload) => { type: ACTION_TYPE; payload: TSuccessPayload };
    error?: (data: TErrorPayload) => { type: ACTION_TYPE; payload: TErrorPayload };
}

// Define the shape of a generic Redux action for this middleware
export interface ApiAction<TData = unknown, TSuccessPayload = unknown, TErrorPayload = unknown> {
    type: ACTION_TYPE.API;
    payload: ApiActionPayload<TData, TSuccessPayload, TErrorPayload>;
}

// Define the type for the form values for login
export interface LoginFormData {
    email: string;
    password: string;
}

// Define the expected response structure from the login API
export interface LoginSuccessResponse {
    status: number; // Added status based on your .then() check
    message: string;
    token?: string; // Optional token
    user?: { id: string; email: string }; // Optional user data
    // Add other properties that your login API returns on success
}

export interface LoginErrorResponse {
    message: string;
    // Add other properties that your login API returns on error
}

// Common success/error response types for other actions (if not specific)
export interface SuccessResponse {
    message: string;
}

export interface ErrorResponse {
    message: string;
}

// New: Define input data types for other actions
export interface LogoutData {
    // Define any data required for logout, e.g., userId or token
    userId?: string;
    refreshToken?: string; // Example: if using refresh tokens
}

export interface ChangePasswordData {
    oldPassword: string;
    newPassword: string;
}

export interface ForgotPasswordData {
    email: string;
}

// This type is crucial to correctly type `dispatch` for actions that return promises
// from middleware, like your `API_CALL` action.
// It now includes all possible success/error response types.
export type AppDispatch = (
    action:
        | ApiAction<LoginFormData, LoginSuccessResponse, LoginErrorResponse>
        | ApiAction<LogoutData, SuccessResponse, ErrorResponse>
        | ApiAction<ChangePasswordData, SuccessResponse, ErrorResponse>
        | ApiAction<ForgotPasswordData, SuccessResponse, ErrorResponse>,
) => Promise<LoginSuccessResponse | LoginErrorResponse | SuccessResponse | ErrorResponse>;
