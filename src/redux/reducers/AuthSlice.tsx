import axios from 'axios';

// Import action types from your centralized types file
import { ACTION_TYPE, type ErrorResponse, type SuccessResponse } from '@/pages/LogIn/authTypes.ts';
// Import constants
import { LS_AUTHTOKEN, LS_USER } from '@/utills/constants.api.ts';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type User = {
    id: string;
    name: string;
    email: string;
    avatarUrl: string;
    address: {
        street: string;
        city: string;
        country: string;
    };
};

// Define the shape of user data for better type safety
export interface UserData {
    data?: User;
    // a token here from the login response
    token?: string;
}

// Define the shape of the authentication state
export interface AuthState {
    isLoading: boolean;
    isLoggedIn: boolean;
    // Use the specific user type or null
    userData: User | null;
    // Error can be a specific error response type or null
    error: ErrorResponse | null;
}

const initialState: AuthState = {
    // Global loader for api
    isLoading: false,
    // Auth Data - check localStorage to persist login state across reloads
    isLoggedIn: !!localStorage.getItem(LS_AUTHTOKEN),
    userData: localStorage.getItem(LS_USER)
        ? JSON.parse(localStorage.getItem(LS_USER) as string)
        : null,
    error: null,
};

// Reducer
const AuthSlice = createSlice({
    name: 'auth', // Changed name from 'login' to 'auth' for clarity
    initialState: initialState,
    reducers: {
        loaderChange: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        // This can be used for manually clearing errors from the UI
        clearAuthError: state => {
            state.error = null;
        },
    },

    extraReducers: builder => {
        builder.addCase(
            ACTION_TYPE.LOGIN_SUCCESS as string,
            (state, action: PayloadAction<{ data: UserData }>) => {
                const { token, data } = action.payload.data;
                console.log(action.payload.data);
                console.log(token, data);
                // Set default header for all subsequent API calls
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                localStorage.setItem(LS_AUTHTOKEN, JSON.stringify(token));
                localStorage.setItem(LS_USER, JSON.stringify(data));

                state.userData = data as User;
                state.isLoggedIn = true;
                state.error = null;
            },
        );

        builder.addCase(
            ACTION_TYPE.LOGIN_FAIL as string,
            (state, action: PayloadAction<ErrorResponse>) => {
                // Clear any previous session data
                delete axios.defaults.headers.common['Authorization'];
                localStorage.removeItem(LS_AUTHTOKEN);
                localStorage.removeItem(LS_USER);

                state.userData = null;
                state.isLoggedIn = false;
                state.error = action.payload;
            },
        );

        // --- LOGOUT ACTIONS ---
        builder.addCase(ACTION_TYPE.LOGOUT_SUCCESS as string, state => {
            // Clear session data from state and storage
            delete axios.defaults.headers.common['Authorization'];
            localStorage.removeItem(LS_AUTHTOKEN);
            localStorage.removeItem(LS_USER);

            state.isLoggedIn = false;
            state.userData = null;
            state.error = null;
        });

        builder.addCase(
            ACTION_TYPE.LOGOUT_FAIL as string,
            (state, action: PayloadAction<ErrorResponse>) => {
                // If logout fails, we might want to log the error but keep the user logged in.
                state.error = action.payload;
                console.error('Logout failed:', action.payload);
            },
        );

        // --- CHANGE PASSWORD ACTIONS ---
        builder.addCase(
            ACTION_TYPE.CHANGE_PASSWORD_SUCCESS as string,
            (state, action: PayloadAction<SuccessResponse>) => {
                // Typically, we just need to confirm success to the user.
                // No state change is usually needed, but we clear any previous errors.
                state.error = null;
                console.log('Password changed successfully:', action.payload.message);
            },
        );

        builder.addCase(
            ACTION_TYPE.CHANGE_PASSWORD_FAIL as string,
            (state, action: PayloadAction<ErrorResponse>) => {
                // Set the error state to provide feedback in the UI.
                state.error = action.payload;
            },
        );

        // --- FORGOT PASSWORD ACTIONS ---
        builder.addCase(
            ACTION_TYPE.FORGOT_PASSWORD_SUCCESS as string,
            (state, action: PayloadAction<SuccessResponse>) => {
                // Similar to change password, clear any errors and log success.
                state.error = null;
                console.log('Forgot password request successful:', action.payload.message);
            },
        );

        builder.addCase(
            ACTION_TYPE.FORGOT_PASSWORD_FAIL as string,
            (state, action: PayloadAction<ErrorResponse>) => {
                // Set the error state to provide feedback in the UI.
                state.error = action.payload;
            },
        );
    },
});

// --- Selectors for accessing state in components ---
interface RootState {
    auth: AuthState;
}

export const selectUserData = (state: RootState) => state.auth.userData;
export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
export const selectAuthIsLoading = (state: RootState) => state.auth.isLoading;
export const selectAuthError = (state: RootState) => state.auth.error;

// --- Export actions and reducer ---
export const { loaderChange, clearAuthError } = AuthSlice.actions;
export default AuthSlice.reducer;
