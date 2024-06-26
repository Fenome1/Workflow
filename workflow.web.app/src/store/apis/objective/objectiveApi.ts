import {baseApi} from "../index.ts";
import {ApiTags} from "../../fetchBaseQueryWithReauth.ts";
import {HttpMethod} from "../../../common/HttpMetod.ts";
import {IObjective} from "../../../features/models/IObjective.ts";
import {IUpdateObjectiveCommand} from "../../../features/commands/objective/IUpdateObjectiveCommand.ts";
import {
    IAssignifyUserToObjectiveCommand
} from "../../../features/commands/objective/IAssignifyUserToObjectiveCommand.ts";
import {ICreateObjectiveCommand} from "../../../features/commands/objective/ICreateObjectiveCommand.ts";
import {IGetObjectiveByUserCommand} from "../../../features/commands/objective/IGetObjectiveByUserCommand.ts";
import {ISwapObjectiveCommand} from "../../../features/commands/objective/ISwapObjectiveCommand.ts";

export const objectiveApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getObjectivesByColumn: builder.query<IObjective[], number>({
            query: query => ({
                url: `${ApiTags.Objective}/Column/${query}`,
                method: HttpMethod.GET,
            }),
            providesTags: [{type: ApiTags.Objective}, {type: ApiTags.User}]
        }),
        getObjectivesByUser: builder.query<IObjective[], IGetObjectiveByUserCommand>({
            query: command => ({
                url: `${ApiTags.Objective}/Agency/${command.agencyId}/User/${command.userId}`,
                method: HttpMethod.GET,
            }),
            providesTags: [{type: ApiTags.Objective}, {type: ApiTags.User}]
        }),
        createObjective: builder.mutation<number, ICreateObjectiveCommand>({
            query: command => ({
                url: `${ApiTags.Objective}/Create`,
                method: HttpMethod.POST,
                body: command
            }),
            invalidatesTags: () => [
                {type: ApiTags.Objective},
            ]
        }),
        deleteObjective: builder.mutation<number, number>({
            query: id => ({
                url: `${ApiTags.Objective}/Delete/${id}`,
                method: HttpMethod.DELETE,
            }),
            invalidatesTags: () => [
                {type: ApiTags.Objective},
            ]
        }),
        updateObjective: builder.mutation<number, IUpdateObjectiveCommand>({
            query: command => ({
                url: `${ApiTags.Objective}/Update`,
                method: HttpMethod.PUT,
                body: command,
            }),
            invalidatesTags: () => [
                {type: ApiTags.Objective},
            ]
        }),
        assignifyUserToObjective: builder.mutation<void, IAssignifyUserToObjectiveCommand>({
            query: command => ({
                url: `${ApiTags.Objective}/User/Assignify`,
                method: HttpMethod.PUT,
                body: command,
            }),
            invalidatesTags: () =>
                [{type: ApiTags.Objective}]
        }),
        swapObjective: builder.mutation<void, ISwapObjectiveCommand>({
            query: command => ({
                url: `${ApiTags.Objective}/Swap`,
                method: HttpMethod.PUT,
                body: command,
            }),
            invalidatesTags: () =>
                [{type: ApiTags.Objective}]
        })
    }),
});

export const {
    useGetObjectivesByColumnQuery,
    useGetObjectivesByUserQuery,
    useCreateObjectiveMutation,
    useDeleteObjectiveMutation,
    useUpdateObjectiveMutation,
    useAssignifyUserToObjectiveMutation,
    useSwapObjectiveMutation,
} = objectiveApi