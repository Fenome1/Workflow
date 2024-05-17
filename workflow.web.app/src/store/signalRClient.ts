import {AppDispatch, RootState} from "./store.ts";
import {HttpTransportType, HubConnectionBuilder, LogLevel, signalMiddleware, withCallbacks} from "redux-signalr";

export const connection = new HubConnectionBuilder()
    .configureLogging(LogLevel.Debug)
    .withUrl(`${import.meta.env.VITE_API_URL}/testHub`, {
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