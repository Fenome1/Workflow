import {AssignifyType} from "../../../common/AssignifyType.ts";

export interface IAssignifyUserToObjectiveCommand {
    userId: number
    objectiveId: number
    assignifyType: AssignifyType
}