import { configureStore } from '@reduxjs/toolkit';
import requestRewrites from './request-rewrites';

export const Store = configureStore({
    reducer: {
        requestRewrites,
    },
});

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;
