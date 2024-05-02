import {IUser} from "../../features/models/IUser.ts";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {PURGE} from "redux-persist/es/constants";

export interface IUserState {
    accessToken: string | null
    refreshToken: string | null
    user: IUser | null
}

const initialState: IUserState = {
    accessToken: null,
    refreshToken: null,
    user: null
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<IUserState>) => {
            state.user = action.payload.user;
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
        },
        updateUser: (state, action: PayloadAction<IUser>) => {
            state.user = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(PURGE, () => initialState);
    },
});

export const {login, updateUser} = userSlice.actions
export default userSlice.reducer