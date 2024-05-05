import {AnswerType} from "../../../common/AnswerType.ts";

export interface IAnswerOnInvitationCommand {
    invitationId: number
    answerType: AnswerType
}