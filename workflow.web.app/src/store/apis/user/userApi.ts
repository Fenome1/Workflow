import {ApiTags} from "../../fetchBaseQueryWithReauth.ts";
import {HttpMethod} from "../../../common/HttpMetod.ts";
import {IRegisterUserCommand} from "../../../features/commands/user/IRegisterUserCommand.ts";
import {message} from "antd";
import {updateUser} from "../../slices/userSlice.ts";
import {IUser} from "../../../features/models/IUser.ts";
import {IUpdateUserCommand} from "../../../features/commands/user/IUpdateUserCommand.ts";
import {baseApi} from "../index.ts";
import {getErrorMessageFormBaseQuery} from "../../../hok/getErrorMessageFormBaseQuery.ts";
import {FetchBaseQueryError} from "@reduxjs/toolkit/query/react";

export const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getUsersByAgency: builder.query<IUser[], number>({
            query: query => ({
                url: `${ApiTags.User}/Agencies/${query}`,
                method: HttpMethod.GET,
            }),
            providesTags: [{type: ApiTags.User}],
        }),
        updateUser: builder.mutation<IUser, IUpdateUserCommand>({
            query: command => ({
                url: `${ApiTags.User}/Update`,
                method: HttpMethod.PUT,
                body: command
            }),
            async onQueryStarted(_, {dispatch, queryFulfilled}) {
                const {data} = await queryFulfilled
                try {
                    await queryFulfilled
                    dispatch(updateUser(data))
                    message.success("Профиль успешно обновлен", 2)
                } catch (error) {
                    message.error(getErrorMessageFormBaseQuery(error as FetchBaseQueryError), 3)
                }
            },
            invalidatesTags: [{type: ApiTags.User}],
        }),
        regiserUser: builder.mutation<number, IRegisterUserCommand>({
            query: command => ({
                url: `${ApiTags.User}/Register`,
                method: HttpMethod.POST,
                body: command
            }),
            async onQueryStarted(_, {queryFulfilled}) {
                try {
                    await queryFulfilled
                    message.success(`Вы успешно зарегистрированы`, 3)
                } catch (error) {
                    message.error(getErrorMessageFormBaseQuery(error as FetchBaseQueryError), 3)
                }
            }
        }),
    }),
});

export const {
    useRegiserUserMutation,
    useUpdateUserMutation,
    useGetUsersByAgencyQuery
} = userApi;