import {ApiTags, baseApi} from "./baseApi.ts";
import {HttpMethod} from "../../common/HttpMetod.ts";
import {IInvitation} from "../../features/models/IInvitation.ts";
import {ISendInvitationCommand} from "../../features/commands/invitation/ISendInvitationCommand.ts";
import {IAnswerOnInvitationCommand} from "../../features/commands/invitation/IAnswerOnInvitationCommand.ts";
import {message} from "antd";

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
                    const errorMessage = error.error?.data || "Произошла ошибка";
                    message.error(errorMessage, 3);
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
            invalidatesTags: [{type: ApiTags.Invitation}]
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
                    const errorMessage = error.error?.data || "Произошла ошибка";
                    message.error(errorMessage, 3);
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