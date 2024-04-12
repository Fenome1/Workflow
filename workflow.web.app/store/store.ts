import {baseApi} from "./apis/baseApi";
import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {signalRMiddleware} from "./signalRClient.ts";

const rootReducer = combineReducers({
    [baseApi.reducerPath]: baseApi.reducer,
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: getDefaultMiddleware =>
            getDefaultMiddleware({
            }).concat(baseApi.middleware, signalRMiddleware)
    })
}

export const store = setupStore()
export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']