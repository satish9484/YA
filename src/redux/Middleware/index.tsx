import axios from 'axios';

import type { ApiAction, ApiActionPayload } from '@/types/redux';
import { API_BASE } from '@/utills/constants.api.ts';
import type { Middleware } from '@reduxjs/toolkit';

import { loaderChange } from '../reducers/AuthSlice.tsx';

function isApiAction(action: string): boolean {
    return action === 'API_CALL';
}

const reduxApiMiddleware: Middleware = store => next => action => {
    const result = next(action);
    const { type, payload } = action as ApiAction;
    if (isApiAction(type)) {
        const {
            url,
            data,
            success,
            error,
            hideLoader = false,
            method = 'get',
        } = payload as ApiActionPayload;

        if (!hideLoader) store.dispatch(loaderChange(true));

        return axios({
            baseURL: API_BASE,
            method,
            url,
            // Use query params for GET requests; body for others
            ...(method.toLowerCase() === 'get'
                ? { params: data ?? {} }
                : { data: data ?? {} }),
        })
            .then(res => {
                store.dispatch(loaderChange(false));
                if (success) store.dispatch(success(res.data));
                return Promise.resolve(res.data);
            })
            .catch(err => {
                store.dispatch(loaderChange(false));
                if (error) store.dispatch(error(err.response?.data));
                return Promise.reject(err.response?.data);
            });
    }

    return result;
};

export default reduxApiMiddleware;
