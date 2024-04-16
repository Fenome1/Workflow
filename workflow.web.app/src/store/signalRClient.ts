import {BASE_HUB_URL} from "../../config.ts";
import {AppDispatch, RootState} from "./store.ts";
import {HttpTransportType, HubConnectionBuilder, LogLevel, signalMiddleware, withCallbacks} from "redux-signalr";

export const connection = new HubConnectionBuilder()
    .configureLogging(LogLevel.Debug)
    .withUrl(`${BASE_HUB_URL}/testHub`, {
        skipNegotiation: true,
        transport: HttpTransportType.WebSockets,
    })
    .configureLogging(LogLevel.Information)
    .withAutomaticReconnect()
    .build();

const callbacks = withCallbacks<AppDispatch, RootState>()

export const signal = signalMiddleware({
    callbacks,
    connection,
    shouldConnectionStartImmediately: false
});