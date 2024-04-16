import {ApiTags, baseApi} from "./baseApi.ts";
import {HttpMethod} from "../../common/HttpMetod.ts";
import {IProject} from "../../features/models/IProject.ts";

export const projectApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getProjectsByAgency: builder.query<IProject[], number>({
            query: query => ({
                url: `${ApiTags.Project}/Agency/${query}`,
                method: HttpMethod.GET,
            }),
            providesTags: [{type: ApiTags.Project}]
        }),
    }),
});

export const {
    useGetProjectsByAgencyQuery
} = projectApi