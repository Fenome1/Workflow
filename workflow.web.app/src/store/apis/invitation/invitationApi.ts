import {ApiTags} from "../../fetchBaseQueryWithReauth.ts";
import {HttpMethod} from "../../../common/HttpMetod.ts";
import {IInvitation} from "../../../features/models/IInvitation.ts";
import {ISendInvitationCommand} from "../../../features/commands/invitation/ISendInvitationCommand.ts";
import {IAnswerOnInvitationCommand} from "../../../features/commands/invitation/IAnswerOnInvitationCommand.ts";
import {message} from "antd";
import {baseApi} from "../index.ts";
import {getErrorMessageFormBaseQuery} from "../../../hok/getErrorMessageFormBaseQuery.ts";
import {FetchBaseQueryError} from "@reduxjs/toolkit/query/react";

export const invitationApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAgencyInvitations: builder.query<IInvitation[], number>({
            query: query => ({
                url: `${ApiTags.Invitation}/Agency/${query}`,
                method: HttpMethod.GET,
            }),
            providesTags: [{type: ApiTags.Invitation}]
        }),
        getUserInvitations: builder.query<IInvitation[], number>({
            query: query => ({
                url: `${ApiTags.Invitation}/User/${query}`,
                method: HttpMethod.GET,
            }),
            providesTags: [{type: ApiTags.Invitation}]
        }),
        sendInvitation: builder.mutation<number, ISendInvitationCommand>({
            query: command => ({
                url: `${ApiTags.Invitation}/Send`,
                method: HttpMethod.POST,
                body: command
            }),
            async onQueryStarted(_, {queryFulfilled}) {
                try {
                    await queryFulfilled
                    message.success("Пользователь успешно приглашен", 2)
                } catch (error) {
                    message.error(getErrorMessageFormBaseQuery(error as FetchBaseQueryError), 3)
                }
            },
            invalidatesTags: [{type: ApiTags.Invitation}]
        }),
        answerInvitation: builder.mutation<number, IAnswerOnInvitationCommand>({
            query: command => ({
                url: `${ApiTags.Invitation}/Answer`,
                method: HttpMethod.PUT,
                body: command
            }),
            invalidatesTags: [{type: ApiTags.Invitation}, {type: ApiTags.User}]
        }),
        recallInvitation: builder.mutation<number, number>({
            query: id => ({
                url: `${ApiTags.Invitation}/Recall/${id}`,
                method: HttpMethod.DELETE,
            }),
            async onQueryStarted(_, {queryFulfilled}) {
                try {
                    await queryFulfilled
                    message.success("Приглашение отозвано", 2)
                } catch (error) {
                    message.error(getErrorMessageFormBaseQuery(error as FetchBaseQueryError), 3)
                }
            },
            invalidatesTags: [{type: ApiTags.Invitation}]
        }),
    }),
});

export const {
    useGetAgencyInvitationsQuery,
    useGetUserInvitationsQuery,
    useSendInvitationMutation,
    useAnswerInvitationMutation,
    useRecallInvitationMutation,
} = invitationApi