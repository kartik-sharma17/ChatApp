import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const rootApislice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:4000",
        prepareHeaders: (headers) => {
            const token = localStorage.getItem("token");
            if (token) {
                headers.set("Aucthorization", `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ['Auth'],
    endpoints: () => ({})
})