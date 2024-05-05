import {IInvitationStatus} from "./IInvitationStatus.ts";
import {IUser} from "./IUser.ts";

export interface IInvitation {
    invitationId: number
    agencyId: number
    userId: number
    invitationStatus: IInvitationStatus
    user: IUser
    agencyName: string
}