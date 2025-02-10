import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { login, logout, setToken } from '../../features/user/user-slice'; 

import { User } from '../../features/user/user-types';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({baseUrl: 'https://backend-ashen-seven-22.vercel.app'}),
    endpoints: (builder) => ({
        getUser: builder.query<Partial<User>, string | undefined>({
            query: (token) => ({
                url: '/profile',
                headers: { Authorization: token},
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled}) {
                try {
                    const { data } = await queryFulfilled;

                    if (data) {
                        dispatch(login(data));
                    };
                } catch {
                    dispatch(logout());
                };
            },
        }),

        toLogin: builder.mutation<{token: string, type: string}, {email: string, password: string}>({
            query: (userInfo) => ({
                url: '/login',
                method: 'POST',
                body: userInfo,
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled}) {
                try {
                    const { data } = await queryFulfilled;
                    sessionStorage.setItem('jwtAuth', data.token);
                    dispatch(setToken(data.token));
                } catch {
                    dispatch(logout());
                };
            },
        }),

        toRegister: builder.mutation<{token: string, type: string}, {email: string, password: string}>({
            query: (userInfo) => ({
                url: '/register',
                method: 'POST',
                body: userInfo,
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled}) {
                try {
                    const { data } = await queryFulfilled;
                    sessionStorage.setItem('jwtAuth', data.token);
                    dispatch(setToken(data.token));
                } catch {
                    dispatch(logout());
                };
            },
        }),
    }),
});

export const { useGetUserQuery, useToLoginMutation, useToRegisterMutation } = apiSlice;