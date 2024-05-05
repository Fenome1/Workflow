import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {BASE_API_URL} from "../../../config.ts";
import {RootState} from "../store.ts";

export enum ApiTags {
    User = "User",
    Agency = "Agency",
    Project = "Project",
    Board = 'Board',
    Column = "Column",
    Objective = 'Objective',
    Priority = 'Priority',
    Invitation = "Invitation"
}

const baseQuery = fetchBaseQuery({
    baseUrl: BASE_API_URL,
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
    },
    mode: "cors",
    prepareHeaders: (headers, {getState}) => {
        const accessToken = (getState() as RootState).user.accessToken ?? null;
        if (accessToken) {
            headers.set("Authorization", `Bearer ${accessToken}`)
        }
        return headers
    }
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
