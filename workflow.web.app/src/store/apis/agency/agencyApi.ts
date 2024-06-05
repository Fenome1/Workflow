import {HttpMethod} from "../../../common/HttpMetod.ts";
import {IAgency} from "../../../features/models/IAgency.ts";
import {IUpdateAgencyCommand} from "../../../features/commands/agency/IUpdateAgencyCommand.ts";
import {ICreateAgencyCommand} from "../../../features/commands/agency/ICreateAgencyCommand.ts";
import {IFireUserFormAgencyCommand} from "../../../features/commands/agency/IFireUserFormAgencyCommand.ts";
import {message} from "antd";
import {FireVariant} from "../../../common/FireVariant.ts";
import {ApiTags} from "../../fetchBaseQueryWithReauth.ts";
import {baseApi} from "../index.ts";
import {getErrorMessageFormBaseQuery} from "../../../hok/getErrorMessageFormBaseQuery.ts";
import {FetchBaseQueryError} from "@reduxjs/toolkit/query/react";
import {IJoinToAgencyCommand} from "../../../features/commands/agency/IJoinToAgencyCommand.ts";

export const agencyApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAgencyByUser: builder.query<IAgency[], number>({
            query: query => ({
                url: `${ApiTags.Agency}/User/${query}`,
                method: HttpMethod.GET,
            }),
            providesTags: [{type: ApiTags.User}],
        }),
        getAgencyByToken: builder.query<IAgency, string>({
            query: query => ({
                url: `${ApiTags.Agency}/Token/${query}`,
                method: HttpMethod.GET,
            })
        }),
        createAgency: builder.mutation<number, ICreateAgencyCommand>({
            query: command => ({
                url: `${ApiTags.Agency}/Create`,
                method: HttpMethod.POST,
                body: command
            }),
            invalidatesTags: [{type: ApiTags.User}]
        }),
        updateAgency: builder.mutation<number, IUpdateAgencyCommand>({
            query: command => ({
                url: `${ApiTags.Agency}/Update`,
                method: HttpMethod.PUT,
                body: command
            }),
            invalidatesTags: [{type: ApiTags.User}]
        }),
        deleteAgency: builder.mutation<number, number>({
            query: id => ({
                url: `${ApiTags.Agency}/Delete/${id}`,
                method: HttpMethod.DELETE,
            }),
            async onQueryStarted(_, {queryFulfilled}) {
                try {
                    await queryFulfilled
                    message.success(`Агентство успешно удалено`, 3)
                } catch (error) {
                    message.error(getErrorMessageFormBaseQuery(error as FetchBaseQueryError), 3)
                }
            },
            invalidatesTags: [{type: ApiTags.User}],
        }),
        fireUserFromAgency: builder.mutation<number, IFireUserFormAgencyCommand>({
            query: command => ({
                url: `${ApiTags.Agency}/Fire`,
                method: HttpMethod.DELETE,
                body: command
            }),
            async onQueryStarted(command, {queryFulfilled}) {
                try {
                    await queryFulfilled
                    const successMessage =
                        command?.fireVariant === FireVariant.Someone ?
                            "Сотрудник успешно удален из агентства" :
                            "Вы успешно покинули агентство"
                    message.success(successMessage, 3)
                } catch (error) {
                    message.error(getErrorMessageFormBaseQuery(error as FetchBaseQueryError), 3)
                }
            },
            invalidatesTags: [{type: ApiTags.User}],
        }),
        joinToAgency: builder.mutation<number, IJoinToAgencyCommand>({
            query: command => ({
                url: `${ApiTags.Agency}/Join`,
                method: HttpMethod.PUT,
                body: command
            }),
            async onQueryStarted(_, {queryFulfilled}) {
                try {
                    await queryFulfilled
                    message.success("Вы успешно присоединились в агентство", 3)
                } catch (error) {
                    message.error(getErrorMessageFormBaseQuery(error as FetchBaseQueryError), 3)
                }
            },
            invalidatesTags: [{type: ApiTags.User}],
        })
    }),
});

export const {
    useGetAgencyByUserQuery,
    useGetAgencyByTokenQuery,
    useCreateAgencyMutation,
    useUpdateAgencyMutation,
    useDeleteAgencyMutation,
    useFireUserFromAgencyMutation,
    useJoinToAgencyMutation
} = agencyApi