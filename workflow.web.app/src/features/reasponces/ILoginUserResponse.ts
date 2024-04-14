import {IUser} from "../models/IUser.ts";

export interface ILoginUserResponse {
    accessToken: string
    refreshToken: string
    user: IUser
}