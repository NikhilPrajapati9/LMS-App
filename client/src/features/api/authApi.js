import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { userLoggedIn } from '../authSlice';


export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `/api/v1/user`,
        credentials: "include",
    }),
    endpoints: (builder) => ({
        registerUser: builder.mutation({
            query: (userData) => ({
                url: "/register",
                method: "POST",
                body: userData,
            }),
        }),
        loginUser: builder.mutation({
            query: (userData) => ({
                url: "/login",
                method: "POST",
                body: userData,
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;

                    dispatch(userLoggedIn({ user: data.user }));

                } catch (error) {
                    console.log("Login error", error);
                }
            }
        }),
        // logoutUser: builder.mutation({
        //     query: () => ({
        //         url: "/logout",
        //         method: "POST",
        //     }),

        // }),
    })
})

export const { useRegisterUserMutation, useLoginUserMutation } = authApi;
