import {ApiTags, baseApi} from "./baseApi.ts";
import {HttpMethod} from "../../common/HttpMetod.ts";
import {message} from "antd";
import {IAgency} from "../../features/models/IAgency.ts";
import {IUpdateAgencyCommand} from "../../features/commands/agency/IUpdateAgencyCommand.ts";

export const agencyApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAgencyByUser: builder.query<IAgency[], number>({
            query: query => ({
                url: `${ApiTags.Agency}/User/${query}`,
                method: HttpMethod.GET,
            }),
            providesTags: [{type: ApiTags.Agency}]
        }),
        updateAgency: builder.mutation<IUpdateAgencyCommand, number>({
            query: command => ({
                url: `${ApiTags.Agency}/Update`,
                method: HttpMethod.PUT,
                body: command
            }),
            async onQueryStarted(_, {queryFulfilled}) {
                try {
                    await queryFulfilled
                } catch (error) {
                    const errorMessage = error.error?.data || "Произошла ошибка";
                    message.error(errorMessage, 3)
                }
            },
            invalidatesTags: [{type: ApiTags.User}]
        })
    }),
});

export const {
    useGetAgencyByUserQuery,
    useUpdateAgencyMutation,
} = agencyApi