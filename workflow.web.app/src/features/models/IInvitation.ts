import {IInvitationStatus} from "./IInvitationStatus.ts";
import {IUser} from "./IUser.ts";

export interface IInvitation {
    invitationId: number
    agencyName: string
    agencyId: number
    userId: number
    owner: IUser
    user?: IUser
    invitationStatus: IInvitationStatus
}