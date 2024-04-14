import {RootState} from "./store";
import {Mutex} from "async-mutex";
import {BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError} from "@reduxjs/toolkit/query";
import {BASE_API_URL} from "../../config.ts";
import {userApi} from "./apis/userApi.ts";
import {IRefreshUserCommand} from "../features/commands/user/IRefreshUserCommand.ts";

export const baseQuery = fetchBaseQuery({
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

const mutex = new Mutex()

export const fetchQueryWithReauth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    await mutex.waitForUnlock()
    let result = await baseQuery(args, api, extraOptions)
    if (result.error && result.error.status === 401) {
        if (!mutex.isLocked()) {
            const release = await mutex.acquire()
            const authState = (api.getState() as RootState).user;

            try {
                const user = authState.user

                if (user) {
                    await api.dispatch(userApi.endpoints.refresh.initiate({
                        accessToken: authState.accessToken,
                        refreshToken: authState.refreshToken
                    } as IRefreshUserCommand))
                }

                result = await baseQuery(args, api, extraOptions)
            } finally {
                await release()
            }
        } else {
            await mutex.waitForUnlock()
            result = await baseQuery(args, api, extraOptions)
        }
    }
    return result
}