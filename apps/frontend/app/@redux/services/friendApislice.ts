import { rootApislice } from "./rootApislice";

export const friendApislice = rootApislice.injectEndpoints({
    endpoints: (builder) => ({
        getRequest: builder.query({
            query: () => `/request`,
            providesTags: ['Friends']
        }),
    }),
});

export const { useGetRequestQuery } = friendApislice;