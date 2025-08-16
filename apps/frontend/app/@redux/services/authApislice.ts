import { rootApislice } from "./rootApislice";

export const authApislice = rootApislice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `/auth/login`,
                method: "POST",
                body: data
            }),
            invalidatesTags: ['Auth']
        }),
        signup: builder.mutation({
            query: (data) => ({
                url: `/auth/signup`,
                method: "POST",
                body: data
            }),
            invalidatesTags: ['Auth']
        })
    }),
});

export const { useLoginMutation, useSignupMutation } = authApislice;