import {ApiTags, baseApi} from "./baseApi.ts";
import {HttpMethod} from "../../common/HttpMetod.ts";
import {IObjective} from "../../features/models/IObjective.ts";
import {IUpdateObjectiveCommand} from "../../features/commands/objective/IUpdateObjectiveCommand.ts";

export const objectiveApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getObjectivesByColumn: builder.query<IObjective[], number>({
            query: query => ({
                url: `${ApiTags.Objective}/Column/${query}`,
                method: HttpMethod.GET,
            }),
            providesTags: [{type: ApiTags.Objective}]
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
        })
    }),
});

export const {
    useGetObjectivesByColumnQuery,
    useDeleteObjectiveMutation,
    useUpdateObjectiveMutation,
} = objectiveApi