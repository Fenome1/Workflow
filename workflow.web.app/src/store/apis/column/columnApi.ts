import {ApiTags} from "../../fetchBaseQueryWithReauth.ts";
import {HttpMethod} from "../../../common/HttpMetod.ts";
import {IColumn} from "../../../features/models/IColumn.ts";
import {IUpdateColumnCommand} from "../../../features/commands/column/IUpdateColumnCommand.ts";
import {ICreateColumnCommand} from "../../../features/commands/column/ICreateColumnCommand.ts";
import {baseApi} from "../index.ts";

export const columnApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getColumnsByBoard: builder.query<IColumn[], number>({
            query: query => ({
                url: `${ApiTags.Column}/Board/${query}`,
                method: HttpMethod.GET,
            }),
            providesTags: [{type: ApiTags.Column}]
        }),
        createColumn: builder.mutation<number, ICreateColumnCommand>({
            query: command => ({
                url: `${ApiTags.Column}/Create`,
                method: HttpMethod.POST,
                body: command
            }),
            invalidatesTags: [{type: ApiTags.Column}]
        }),
        updateColumn: builder.mutation<number, IUpdateColumnCommand>({
            query: command => ({
                url: `${ApiTags.Column}/Update`,
                method: HttpMethod.PUT,
                body: command
            }),
            invalidatesTags: [{type: ApiTags.Column}]
        }),
        deleteColumn: builder.mutation<void, number>({
            query: id => ({
                url: `${ApiTags.Column}/Delete/${id}`,
                method: HttpMethod.DELETE
            }),
            invalidatesTags: [{type: ApiTags.Column}]
        }),
    }),
});

export const {
    useGetColumnsByBoardQuery,
    useCreateColumnMutation,
    useDeleteColumnMutation,
    useUpdateColumnMutation
} = columnApi