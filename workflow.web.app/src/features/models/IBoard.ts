export interface IBoard {
    boardId: number
    name: string
    description: string | null
    projectId: number
    columnsCount: number
    objectivesCount: number
}