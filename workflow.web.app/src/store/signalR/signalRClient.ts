import * as signalR from '@microsoft/signalr';
import {HttpTransportType} from '@microsoft/signalr';
import {IUserState} from "../slices/userSlice.ts";
import {AppDispatch} from "../store.ts";
import {baseApi} from "../apis";
import {ApiTags} from "../fetchBaseQueryWithReauth.ts";


export const signalRClient = (dispatch: AppDispatch, userState?: IUserState | null, agencyId?: number | undefined) => {
    if (!userState || !agencyId) {
        return null;
    }

    const connection = new signalR.HubConnectionBuilder()
        .withAutomaticReconnect()
        .withStatefulReconnect()
        .withUrl(`${import.meta.env.VITE_API_URL}/Hubs/NotifyHub`, {
            transport: HttpTransportType.WebSockets,
            skipNegotiation: true
        })
        .build();

    connection.start()
        .then(() => {
            if (connection.state === "Connected") {
                connection.invoke("JoinAgencyAsync", agencyId)
                    .catch(err => console.error('Error invoking JoinAgencyAsync:', err));
            }
        })
        .catch(err => console.error('SignalR Connection Error: ', err));

    registerAgencyCallBacks(connection, dispatch)
    registerProjectCallBacks(connection, dispatch)
    registerBoardCallBacks(connection, dispatch)
    registerColumnCallBacks(connection, dispatch)
    registerObjectiveCallBacks(connection, dispatch)
    registerLinkCallBacks(connection, dispatch)

    return connection
};

const registerAgencyCallBacks = (connection: signalR.HubConnection, dispatch: AppDispatch) => {
    connection.on('AgencyNotify', () => {
        dispatch(baseApi.util.invalidateTags([
            {type: ApiTags.User}
        ]))
    });
}

const registerProjectCallBacks = (connection: signalR.HubConnection, dispatch: AppDispatch) => {
    connection.on('ProjectNotify', () => {
        dispatch(baseApi.util.invalidateTags([
            {type: ApiTags.Project}
        ]))
    });
}

const registerBoardCallBacks = (connection: signalR.HubConnection, dispatch: AppDispatch) => {
    connection.on('BoardNotify', () => {
        dispatch(baseApi.util.invalidateTags([
            {type: ApiTags.Board}
        ]))
    });
}

const registerColumnCallBacks = (connection: signalR.HubConnection, dispatch: AppDispatch) => {
    connection.on('ColumnNotify', () => {
        dispatch(baseApi.util.invalidateTags([
            {type: ApiTags.Column}
        ]))
    });
}

const registerObjectiveCallBacks = (connection: signalR.HubConnection, dispatch: AppDispatch) => {
    connection.on('ObjectiveNotify', () => {
        dispatch(baseApi.util.invalidateTags([
            {type: ApiTags.Objective}, {type: ApiTags.Board}, {type: ApiTags.Column}
        ]))
    });
}

const registerLinkCallBacks = (connection: signalR.HubConnection, dispatch: AppDispatch) => {
    connection.on('LinkNotify', () => {
        dispatch(baseApi.util.invalidateTags([
            {type: ApiTags.Link}
        ]))
    });
}