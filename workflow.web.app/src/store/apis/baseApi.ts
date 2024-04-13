import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {BASE_API_URL} from "../../../config.ts";

export enum ApiTags {
    Test = "Test",
}

const baseQuery = fetchBaseQuery({
    baseUrl: BASE_API_URL,
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
    },
    mode: "cors"
})

export const baseApi = createApi({
    reducerPath: "baseApi",
    baseQuery: baseQuery,
    tagTypes: Object.values(ApiTags),
    refetchOnReconnect: true,
    refetchOnFocus: true,
    keepUnusedDataFor: 0,
    endpoints: () => ({}),
})
