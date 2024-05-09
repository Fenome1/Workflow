import {FireVariant} from "../../../common/FireVariant.ts";

export interface IFireUserFormAgencyCommand {
    agencyId: number
    userId: number
    fireVariant?: FireVariant
}