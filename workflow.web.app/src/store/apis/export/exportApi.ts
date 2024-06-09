import {baseApi} from "../index.ts";
import {ApiTags, baseQuery} from "../../fetchBaseQueryWithReauth.ts";
import {HttpMethod} from "../../../common/HttpMetod.ts";
import {FetchBaseQueryError} from "@reduxjs/toolkit/query/react";
import {getFileNameFromHeaders} from "../../../hok/getFileNameFromHeaders.ts";
import {downloadFile} from "../../../hok/downloadFile.ts";

export const exportApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        downloadUserObjectives: builder.mutation<void, number>({
            queryFn: async (userId, api, extraOptions) => {

                const response = await baseQuery({
                    url: `${ApiTags.Export}/Objectives/User/${userId}`,
                    method: HttpMethod.GET,
                    responseHandler: async response => await response.blob()
                }, api, extraOptions)

                const headers = response!.meta?.response?.headers

                if (headers) {
                    const fileName = getFileNameFromHeaders(headers)

                    const blob = response.data as Blob
                    downloadFile(fileName, blob)
                }

                return {error: response.error as FetchBaseQueryError};
            },
        }),
    }),
})

export const {
    useDownloadUserObjectivesMutation
} = exportApi