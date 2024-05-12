import {createApi} from "@reduxjs/toolkit/query/react";
import {ApiTags, baseQuery, fetchQueryWithReauth} from "../fetchBaseQueryWithReauth.ts";
import {ILoginUserResponse} from "../../features/reasponces/ILoginUserResponse.ts";
import {ILoginUserCommand} from "../../features/commands/user/ILoginUserCommand.ts";
import {HttpMethod} from "../../common/HttpMetod.ts";
import {login} from "../slices/userSlice.ts";
import {message} from "antd";
import {ILogoutUserCommand} from "../../features/commands/user/ILogoutUserCommand.ts";
import {resetAndCleanStore, RootState} from "../store.ts";
import {IRefreshUserCommand} from "../../features/commands/user/IRefreshUserCommand.ts";
import {FetchBaseQueryError} from "@reduxjs/toolkit/query";
import {getErrorMessageFormBaseQuery} from "../../hok/getErrorMessageFormBaseQuery.ts";

export const baseApi = createApi({
    reducerPath: "baseApi",
    baseQuery: fetchQueryWithReauth,
    tagTypes: Object.values(ApiTags),
    refetchOnReconnect: true,
    refetchOnFocus: true,
    keepUnusedDataFor: 0,
    endpoints: () => ({})
})

export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<ILoginUserResponse, ILoginUserCommand>({
            query: command => ({
                url: `${ApiTags.Auth}/Login`,
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
                    message.error(getErrorMessageFormBaseQuery(error as FetchBaseQueryError), 3)
                }
            }
        }),
        logout: builder.mutation<void, ILogoutUserCommand>({
            query: command => ({
                url: `${ApiTags.Auth}/Logout`,
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
                    url: `${ApiTags.Auth}/Refresh`,
                    method: HttpMethod.POST,
                    body: command,
                }, api, extraOptions)
                if (response.data) {
                    const result = response.data as ILoginUserResponse
                    await api.dispatch(login(result))
                    return {data: result}
                }
                const authState = (api.getState() as RootState).user;
                await api.dispatch(authApi.endpoints.logout.initiate({
                    accessToken: authState.accessToken,
                    refreshToken: authState.refreshToken
                } as ILogoutUserCommand))
                return {error: response.error as FetchBaseQueryError}
            },
        })
    })
})

export const {
    useLoginMutation,
    useLogoutMutation,
} = authApi;
