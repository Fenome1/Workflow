export interface IUpdateObjectiveCommand {
    objectiveId: number
    status?: boolean
    name?: string
    priorityId?: string
    deadline?: string
    isDeadlineReset?: boolean
    isPriorityReset?: boolean
}