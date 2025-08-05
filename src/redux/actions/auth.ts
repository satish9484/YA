// src/actions/auth.ts
// Import all necessary types and constants from your authTypes file
import {
    ACTION_TYPE,
    API_TYPE,
    type ApiAction,
    type ChangePasswordData,
    type ErrorResponse,
    type ForgotPasswordData,
    type LoginErrorResponse,
    type LoginFormData,
    type LoginSuccessResponse,
    type LogoutData,
    type SuccessResponse,
} from '@/pages/LogIn/authTypes.ts';

// Adjust this path based on your project structure

/**
 * Redux action creator for user login.
 * Dispatches an API action to log in a user with the provided credentials.
 *
 * @param data - The login form data (email and password).
 * @returns An ApiAction object to be processed by a Redux API middleware.
 */
export const doLogin = (
    data: LoginFormData,
): ApiAction<LoginFormData, LoginSuccessResponse, LoginErrorResponse> => ({
    type: ACTION_TYPE.API,
    payload: {
        url: API_TYPE.API_LOGIN,
        method: 'POST',
        data: data,
        success: (responseData: LoginSuccessResponse) => ({
            type: ACTION_TYPE.LOGIN_SUCCESS,
            payload: responseData,
        }),
        error: (errorData: LoginErrorResponse) => ({
            type: ACTION_TYPE.LOGIN_FAIL,
            payload: errorData,
        }),
    },
});

/**
 * Redux action creator for user logout.
 * Dispatches an API action to log out the current user.
 *
 * @param data - Any data required for logout (e.g., user ID, refresh token).
 * @returns An ApiAction object.
 */
export const doLogout = (
    data: LogoutData,
): ApiAction<LogoutData, SuccessResponse, ErrorResponse> => ({
    type: ACTION_TYPE.API,
    payload: {
        url: API_TYPE.API_LOGOUT,
        method: 'POST',
        data: data,
        success: (responseData: SuccessResponse) => ({
            type: ACTION_TYPE.LOGOUT_SUCCESS,
            payload: responseData,
        }),
        error: (errorData: ErrorResponse) => ({
            type: ACTION_TYPE.LOGOUT_FAIL,
            payload: errorData,
        }),
    },
});

/**
 * Redux action creator for changing user password.
 * Dispatches an API action to update the user's password.
 *
 * @param data - The old and new password data.
 * @returns An ApiAction object.
 */
export const changePassword = (
    data: ChangePasswordData,
): ApiAction<ChangePasswordData, SuccessResponse, ErrorResponse> => ({
    type: ACTION_TYPE.API,
    payload: {
        url: API_TYPE.API_CHANGE_PASSWORD,
        method: 'PATCH',
        data: data,
        success: (responseData: SuccessResponse) => ({
            type: ACTION_TYPE.CHANGE_PASSWORD_SUCCESS,
            payload: responseData,
        }),
        error: (errorData: ErrorResponse) => ({
            type: ACTION_TYPE.CHANGE_PASSWORD_FAIL,
            payload: errorData,
        }),
    },
});

/**
 * Redux action creator for initiating a forgot password flow.
 * Dispatches an API action to send a password reset link/code to the user's email.
 *
 * @param data - The user's email for password recovery.
 * @returns An ApiAction object.
 */
export const forgotPassword = (
    data: ForgotPasswordData,
): ApiAction<ForgotPasswordData, SuccessResponse, ErrorResponse> => ({
    type: ACTION_TYPE.API,
    payload: {
        url: API_TYPE.API_FORGOT_PASSWORD,
        method: 'POST',
        data: data,
        success: (responseData: SuccessResponse) => ({
            type: ACTION_TYPE.FORGOT_PASSWORD_SUCCESS,
            payload: responseData,
        }),
        error: (errorData: ErrorResponse) => ({
            type: ACTION_TYPE.FORGOT_PASSWORD_FAIL,
            payload: errorData,
        }),
    },
});
