import {baseApi} from "../index.ts";
import {ApiTags} from "../../fetchBaseQueryWithReauth.ts";
import {HttpMethod} from "../../../common/HttpMetod.ts";
import {IPriority} from "../../../features/models/IPriority.ts";

export const priorityApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getPriority: builder.query<IPriority[], void>({
            query: () => ({
                url: `${ApiTags.Priority}`,
                method: HttpMethod.GET,
            }),
            providesTags: [{type: ApiTags.Priority}]
        }),
    }),
});

export const {
    useGetPriorityQuery,
} = priorityApi