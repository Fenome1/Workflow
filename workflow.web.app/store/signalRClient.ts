import {HttpTransportType, HubConnectionBuilder, LogLevel, signalMiddleware, withCallbacks} from "redux-signalr";
import {BASE_HUB_URL} from "../config";
import {AppDispatch, RootState} from "./store.ts";
import {useDispatch} from "react-redux";

const connection = new HubConnectionBuilder()
    .configureLogging(LogLevel.Debug)
    .withUrl(`${BASE_HUB_URL}/testHub`, {
        skipNegotiation: true,
        transport: HttpTransportType.WebSockets,
    })
    .configureLogging(LogLevel.Information)
    .withAutomaticReconnect()
    .build();

const callbacks = withCallbacks<AppDispatch, RootState>()
    .add('TestCreated', () => () => {
        const dispatch = useDispatch();
        dispatch(receiveNewTest(newTest));
    });
});

export const signalRMiddleware = signalMiddleware({
    callbacks,
    connection
});