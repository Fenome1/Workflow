import {ITest} from "../../features/models/ITest";
import {ApiTags, baseApi} from "./baseApi.ts";
import {HttpMethod} from "../../common/HttpMetod.ts";
import {ICreateTestCommand} from "../../features/commands/test/ICreateTestCommand.ts";

export const testApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getTests: builder.query<ITest[], void>({
            query: () => ({
                url: `${ApiTags.Test}`,
                method: HttpMethod.GET,
            }),
            providesTags: [{type: ApiTags.Test}]
        }),
        createUserOrder: builder.mutation<number, ICreateTestCommand>({
            query: command => ({
                url: `${ApiTags.Test}/Create`,
                method: HttpMethod.POST,
                body: command
            }),
            async onQueryStarted(_, {queryFulfilled}) {
                await queryFulfilled
            },
            invalidatesTags: [{type: ApiTags.Test}],
        }),
    }),
});

export const {
    useGetTestsQuery,
    useCreateUserOrderMutation
} = testApi;