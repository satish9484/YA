import {
    API_LOGIN,
    USER_INFO_F,
    USER_INFO_S,
    USER_LIST_F,
    USER_LIST_S,
} from '@/utills/constants.api.ts';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export interface UserState {
    userList: unknown[];
    userInfo: unknown;
}

const initialState: UserState = {
    userList: [],
    userInfo: {},
};

export const getUserList = (data: unknown) => ({
    type: 'API',
    payload: {
        url: API_LOGIN,
        method: 'POST',
        data: data,
        hideLoader: false,
        success: (data: unknown) => ({
            type: USER_LIST_S,
            payload: data,
        }),
        error: () => ({
            type: USER_LIST_F,
            payload: [],
        }),
    },
});

// Reducer
const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {}, // Add empty reducers object to satisfy CreateSliceOptions
    extraReducers: builder => {
        builder.addCase(USER_LIST_S as string, (state, action: PayloadAction<unknown>) => {
            state.userList = (action.payload as { data: unknown[] }).data;
        });
        builder.addCase(USER_LIST_F as string, state => {
            state.userList = [];
        });
        builder.addCase(USER_INFO_S as string, (state, action: PayloadAction<unknown>) => {
            state.userInfo = (action.payload as { data: unknown }).data;
        });
        builder.addCase(USER_INFO_F as string, state => {
            state.userInfo = {};
        });
    },
});

export default userSlice.reducer;
