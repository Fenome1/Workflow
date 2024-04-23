export interface IUpdateObjectiveCommand {
    objectiveId: number
    status?: boolean
    name?: string
    priorityId?: number
    deadline?: string
    isDeadlineReset?: boolean
    isPriorityReset?: boolean
}