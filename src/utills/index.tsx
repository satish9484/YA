import type { AxiosStatic } from 'axios';

import { ACTION_TYPE } from '@/pages/LogIn/authTypes.ts';
import type { Store } from '@reduxjs/toolkit';

import { API_BASE, LS_AUTHTOKEN, LS_USER } from './constants.api.ts';

// To concatenate the path for the public folder
export const toAbsoluteUrl = (pathname: string): string => API_BASE + pathname;

// Fun used for setting up the common header for axios throughout the app and rehydrate the redux store
export const setupAxios = (axios: AxiosStatic, store: Store): void => {
    const token = JSON.parse(localStorage.getItem(LS_AUTHTOKEN) ?? 'null');
    const userData = JSON.parse(localStorage.getItem(LS_USER) ?? 'null');

    // It's used to rehydrate redux auth data when page is refreshed
    if (token) {
        store.dispatch({
            type: ACTION_TYPE.LOGIN_SUCCESS,
            payload: { data: { data: userData, token: token } },
        });
    } else {
        store.dispatch({ type: ACTION_TYPE.LOGIN_FAIL, payload: {} });
    }

    // It's used to intercept all the axios api response
    axios.interceptors.response.use(
        null,
        (err: { response?: { status: number }; request?: unknown }) => {
            if (err.response) {
                if (err.response.status === 403) {
                    store.dispatch({ type: ACTION_TYPE.LOGIN_FAIL });
                }
                return Promise.reject(err);
            } else if (err.request) {
                return Promise.reject({
                    response: {
                        data: {
                            message: 'Something went wrong, Please try again later!!!',
                        },
                    },
                });
            }
            // Handle other errors (e.g., request setup)
            return Promise.reject(err);
        },
    );
};

// Encrypt Function
export const encrypt = (param: string): string => {
    if (param) return btoa(param);
    else return '';
};

// Decrypt Function
export const decrypt = (param: string): string => {
    if (param) return atob(param);
    else return '';
};

// Debouncing for input search
export function debounce<T extends (...args: unknown[]) => void>(
    func: T,
): (...args: Parameters<T>) => void {
    let timer: ReturnType<typeof setTimeout>;
    return function (this: unknown, ...args: Parameters<T>) {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(this, args);
        }, 500);
    };
}
