export interface ICreateBoardCommand {
    projectId: number
    name: string
    description?: string
}