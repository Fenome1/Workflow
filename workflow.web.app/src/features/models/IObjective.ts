import {IPriority} from "./IPriority.ts";
import {IUser} from "./IUser.ts";

export interface IObjective {
    objectiveId: number
    name: string
    columnId: number
    status: boolean
    order: number
    deadline: string | null
    priority: IPriority | null
    users: IUser[] | null
}