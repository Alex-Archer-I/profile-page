import {configureStore} from '@reduxjs/toolkit';

import userReducser from '../features/user/user-slice';
import { apiSlice } from './api/api-slice';

export const store = configureStore({
    reducer: {
        user: userReducser,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;