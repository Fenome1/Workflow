export interface IUpdateUserCommand {
    userId: number
    email?: string
    name?: string
    avatarImage?: string
    isAvatarImageReset?: boolean
}