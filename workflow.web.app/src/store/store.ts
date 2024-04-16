import {baseApi} from "./apis/baseApi.ts";
import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {signal} from "./signalRClient.ts";
import userSlice from "./slices/userSlice.ts";
import storage from "redux-persist/es/storage";
import {FLUSH, persistReducer, persistStore} from "redux-persist";
import {PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE} from "redux-persist/es/constants";
import {AnyAction, SignalAction, SignalDispatch} from "redux-signalr";
import agencySlice from "./slices/agencySlice.ts";
import projectSlice from "./slices/projectSlice.ts";
import boardSlice from "./slices/boardSlice.ts";

const rootReducer = combineReducers({
    [baseApi.reducerPath]: baseApi.reducer,
    user: userSlice,
    agency: agencySlice,
    project: projectSlice,
    board: boardSlice,
})

const persistedReducer = persistReducer({
    key: "root",
    storage,
    whitelist: ["user"],
}, rootReducer);

export const setupStore = () => {
    return configureStore({
        reducer: persistedReducer,
        middleware: getDefaultMiddleware =>
            getDefaultMiddleware({
                serializableCheck: {
                    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
                }
            }).concat(baseApi.middleware, signal)
    })
}

export const store = setupStore()
export const persistor = persistStore(store)
export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']

export type Action<ReturnValue = void> = SignalAction<
    ReturnValue,
    RootState,
    AnyAction
>

export type Dispatch<Action extends AnyAction = AnyAction> = SignalDispatch<
    RootState,
    Action
>