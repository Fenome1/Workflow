import {ApiTags, baseApi} from "./baseApi.ts";
import {HttpMethod} from "../../common/HttpMetod.ts";
import {IBoard} from "../../features/models/IBoard.ts";
import {ICreateBoardCommand} from "../../features/commands/board/ICreateBoardCommand.ts";
import {IUpdateBoardCommand} from "../../features/commands/board/IUpdateBoardCommand.ts";

export const boardApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getBoardsByProject: builder.query<IBoard[], number>({
            query: query => ({
                url: `${ApiTags.Board}/Project/${query}`,
                method: HttpMethod.GET,
            }),
            providesTags: [{type: ApiTags.Board}]
        }),
        createBoard: builder.mutation<number, ICreateBoardCommand>({
            query: command => ({
                url: `${ApiTags.Board}/Create`,
                method: HttpMethod.POST,
                body: command
            }),
            invalidatesTags: [{type: ApiTags.Board}]
        }),
        updateBoard: builder.mutation<number, IUpdateBoardCommand>({
            query: command => ({
                url: `${ApiTags.Board}/Update`,
                method: HttpMethod.PUT,
                body: command
            }),
            invalidatesTags: [{type: ApiTags.Board}]
        }),
        deleteBoard: builder.mutation<number, number>({
            query: id => ({
                url: `${ApiTags.Board}/Delete/${id}`,
                method: HttpMethod.DELETE,
            }),
            invalidatesTags: [{type: ApiTags.Board}]
        }),
    }),
});

export const {
    useCreateBoardMutation,
    useUpdateBoardMutation,
    useDeleteBoardMutation,
    useGetBoardsByProjectQuery
} = boardApi