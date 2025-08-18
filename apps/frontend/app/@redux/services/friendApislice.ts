import { rootApislice } from "./rootApislice";

export const friendApislice = rootApislice.injectEndpoints({
    endpoints: (builder) => ({
        getRequest: builder.query<any, void>({
            query: () => `/request`,
            providesTags: ['Friends']
        }),
        getUser: builder.query<any, void>({
            query: () => `/users`,
            providesTags: ['Friends']
        }),
        getFriends: builder.query<any, void>({
            query: () => `/friends`,
            providesTags: ['Friends']
        }),
        requestRespose: builder.mutation({
            query: (data) => ({
                url: `/friend-request/respond`,
                method: "POST",
                body: data
            }),
            invalidatesTags: ['Friends']
        }),
        sendRequest: builder.mutation({
            query: (data) => ({
                url: `/friend-request`,
                method: "POST",
                body: data
            }),
            invalidatesTags: ['Friends']
        }),
    }),
});

export const { useGetRequestQuery, useRequestResposeMutation, useGetUserQuery, useSendRequestMutation,useGetFriendsQuery } = friendApislice;