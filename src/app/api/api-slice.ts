import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query';

import { User } from '../../features/user/user-types';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({baseUrl: ''}),
    endpoints: (builder) => ({
        getUser: builder.query<Partial<User>, void>({
            query: () => '/profile',
        }),
    }),
});

export const { useGetUser } = apiSlice;