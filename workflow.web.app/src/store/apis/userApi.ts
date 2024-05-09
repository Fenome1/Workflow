import {ApiTags, baseApi} from "./baseApi.ts";
import {HttpMethod} from "../../common/HttpMetod.ts";
import {IRegisterUserCommand} from "../../features/commands/user/IRegisterUserCommand.ts";
import {message} from "antd";
import {ILoginUserCommand} from "../../features/commands/user/ILoginUserCommand.ts";
import {ILoginUserResponse} from "../../features/reasponces/ILoginUserResponse.ts";
import {login, updateUser} from "../slices/userSlice.ts";
import {ILogoutUserCommand} from "../../features/commands/user/ILogoutUserCommand.ts";
import {IRefreshUserCommand} from "../../features/commands/user/IRefreshUserCommand.ts";
import {baseQuery} from "../fetchBaseQueryWithReauth.ts";
import {resetAndCleanStore, RootState} from "../store.ts";
import {FetchBaseQueryError} from "@reduxjs/toolkit/query";
import {IUser} from "../../features/models/IUser.ts";
import {IUpdateUserCommand} from "../../features/commands/user/IUpdateUserCommand.ts";

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
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-expect-error
                    const errorMessage = error.error?.data || "Произошла ошибка";
                    message.error(errorMessage, 3);
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
                    const errorMessage = error.error?.data || "Произошла ошибка";
                    message.error(errorMessage, 3)
                }
            }
        }),
        loginUser: builder.mutation<ILoginUserResponse, ILoginUserCommand>({
            query: command => ({
                url: `${ApiTags.User}/Login`,
                method: HttpMethod.POST,
                body: command
            }),
            async onQueryStarted(_, {dispatch, queryFulfilled}) {
                try {
                    const {data} = await queryFulfilled
                    await dispatch(login(data));

                    const {user} = data || {};
                    const welcomeMessage = user?.name ? `Добро пожаловать, ${user.name}` : "Добро пожаловать";

                    message.success(welcomeMessage, 3);

                } catch (error) {
                    const errorMessage = error.error?.data || "Произошла ошибка";
                    message.error(errorMessage, 3)
                }
            }
        }),
        logout: builder.mutation<void, ILogoutUserCommand>({
            query: command => ({
                url: `${ApiTags.User}/Logout`,
                method: HttpMethod.POST,
                body: command,
            }),
            async onQueryStarted(_, {queryFulfilled}) {
                await resetAndCleanStore()
                try {
                    await queryFulfilled
                } catch (error) {
                    console.log(error)
                }
            }
        }),
        refresh: builder.mutation<ILoginUserResponse, IRefreshUserCommand>({
            queryFn: async (command, api, extraOptions) => {
                const response = await baseQuery({
                    url: `${ApiTags.User}/Refresh`,
                    method: HttpMethod.POST,
                    body: command,
                }, api, extraOptions)
                if (response.data) {
                    const result = response.data as ILoginUserResponse
                    await api.dispatch(login(result))
                    return {data: result}
                }
                const authState = (api.getState() as RootState).user;
                await api.dispatch(userApi.endpoints.logout.initiate({
                    accessToken: authState.accessToken,
                    refreshToken: authState.refreshToken
                } as ILogoutUserCommand))
                return {error: response.error as FetchBaseQueryError}
            },
        }),
    }),
});

export const {
    useRegiserUserMutation,
    useUpdateUserMutation,
    useLoginUserMutation,
    useLogoutMutation,
    useGetUsersByAgencyQuery
} = userApi;