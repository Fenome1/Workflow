import {baseApi} from "./apis/baseApi.ts";
import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {signalRMiddleware} from "./signalRClient.ts";
import userSlice from "./slices/userSlice.ts";
import storage from "redux-persist/es/storage";
import {FLUSH, persistReducer, persistStore} from "redux-persist";
import {PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE} from "redux-persist/es/constants";

const rootReducer = combineReducers({
    [baseApi.reducerPath]: baseApi.reducer,
    user: userSlice,
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
            }).concat(baseApi.middleware, signalRMiddleware)
    })
}

export const store = setupStore()
export const persistor = persistStore(store)
export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']