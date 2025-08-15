import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";

export const rootApislice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "localhost",
        prepareHeaders: (headers) => {
            const token = localStorage.getItem("token");
            if (token) {
                headers.set("Aucthorization", `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: [],
    endpoints: () => ({})
})