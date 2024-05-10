import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {signal} from "./signalRClient.ts";
import userSlice from "./slices/userSlice.ts";
import storage from "redux-persist/es/storage";
import {FLUSH, persistReducer, persistStore} from "redux-persist";
import {PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE} from "redux-persist/es/constants";
import agencySlice from "./slices/agencySlice.ts";
import projectSlice from "./slices/projectSlice.ts";
import boardSlice from "./slices/boardSlice.ts";
import menuSlice from "./slices/menuSlice.ts";
import {baseApi} from "./apis";

const rootReducer = combineReducers({
    [baseApi.reducerPath]: baseApi.reducer,
    user: userSlice,
    agency: agencySlice,
    project: projectSlice,
    board: boardSlice,
    menu: menuSlice,
})

const persistedReducer = persistReducer({
    key: "root",
    storage,
    whitelist: ["user", "agency", "project", "board", "menu"],
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

export const resetAndCleanStore = async () => {
    try {
        await persistor.purge();
    } catch (error) {
        console.log(error)
    }
};