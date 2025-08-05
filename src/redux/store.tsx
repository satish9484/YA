import { configureStore } from '@reduxjs/toolkit';

// import { thunk } from "redux-thunk";
import reduxApiMiddleware from './Middleware/index.tsx';
import AuthSlice from './reducers/AuthSlice.tsx';
import UserSlice from './reducers/UserSlice.tsx';

const store = configureStore({
    reducer: {
        auth: AuthSlice,
        user: UserSlice,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            // Your API actions include non-serializable functions (success/error handlers),
            // so we disable the serializable check middleware.
            serializableCheck: false,
        }).concat(reduxApiMiddleware),
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
