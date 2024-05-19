import {HttpMethod} from "../../../common/HttpMetod.ts";
import {ApiTags} from "../../fetchBaseQueryWithReauth.ts";
import {baseApi} from "../index.ts";
import {message} from "antd";
import {getErrorMessageFormBaseQuery} from "../../../hok/getErrorMessageFormBaseQuery.ts";
import {FetchBaseQueryError} from "@reduxjs/toolkit/query/react";
import {ILink} from "../../../features/models/ILink.ts";

export const linkApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getLinkByAgency: builder.query<ILink, number>({
            query: query => ({
                url: `${ApiTags.Link}/Agency/${query}`,
                method: HttpMethod.GET,
            }),
            providesTags: [{type: ApiTags.Link}],
        }),
        refreshLink: builder.mutation<number, number>({
            query: id => ({
                url: `${ApiTags.Link}/Refresh/Agency/${id}`,
                method: HttpMethod.POST,
            }),
            async onQueryStarted(_, {queryFulfilled}) {
                try {
                    await queryFulfilled
                    message.success(`Ссылка успешно обновлена`, 3)
                } catch (error) {
                    message.error(getErrorMessageFormBaseQuery(error as FetchBaseQueryError), 3)
                }
            },
            invalidatesTags: [{type: ApiTags.Link}]
        })
    }),
});

export const {
    useGetLinkByAgencyQuery,
    useRefreshLinkMutation
} = linkApi