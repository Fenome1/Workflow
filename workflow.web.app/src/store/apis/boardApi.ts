import {ApiTags, baseApi} from "./baseApi.ts";
import {HttpMethod} from "../../common/HttpMetod.ts";
import {IBoard} from "../../features/models/IBoard.ts";

export const boardApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getBoardByProject: builder.query<IBoard[], number>({
            query: query => ({
                url: `${ApiTags.Board}/Project/${query}`,
                method: HttpMethod.GET,
            }),
            providesTags: [{type: ApiTags.Board}]
        }),
    }),
});

export const {
    useGetBoardByProjectQuery
} = boardApi