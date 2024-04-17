import {ApiTags, baseApi} from "./baseApi.ts";
import {HttpMethod} from "../../common/HttpMetod.ts";
import {IColumn} from "../../features/models/IColumn.ts";

export const columnApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getColumnsByBoard: builder.query<IColumn[], number>({
            query: query => ({
                url: `${ApiTags.Column}/Board/${query}`,
                method: HttpMethod.GET,
            }),
            providesTags: [{type: ApiTags.Column}]
        }),
    }),
});

export const {
    useGetColumnsByBoardQuery
} = columnApi