import {ApiTags, baseApi} from "./baseApi.ts";
import {HttpMethod} from "../../common/HttpMetod.ts";
import {IObjective} from "../../features/models/IObjective.ts";

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
    }),
});

export const {
    useGetObjectivesByColumnQuery,
    useDeleteObjectiveMutation,
} = objectiveApi