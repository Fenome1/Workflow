import {baseApi} from "../index.ts";
import {ApiTags} from "../../fetchBaseQueryWithReauth.ts";
import {HttpMethod} from "../../../common/HttpMetod.ts";
import {IProject} from "../../../features/models/IProject.ts";
import {ICreateProjectCommand} from "../../../features/commands/project/ICreateProjectCommand.ts";
import {IUpdateProjectCommand} from "../../../features/commands/project/IUpdateProjectCommand.ts";
import {message} from "antd";
import {getErrorMessageFormBaseQuery} from "../../../hok/getErrorMessageFormBaseQuery.ts";
import {FetchBaseQueryError} from "@reduxjs/toolkit/query/react";

export const projectApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getProjectsByAgency: builder.query<IProject[], number>({
            query: query => ({
                url: `${ApiTags.Project}/Agency/${query}`,
                method: HttpMethod.GET,
            }),
            providesTags: [{type: ApiTags.Project}]
        }),
        createProject: builder.mutation<number, ICreateProjectCommand>({
            query: command => ({
                url: `${ApiTags.Project}/Create`,
                method: HttpMethod.POST,
                body: command
            }),
            invalidatesTags: [{type: ApiTags.Project}]
        }),
        updateProject: builder.mutation<number, IUpdateProjectCommand>({
            query: command => ({
                url: `${ApiTags.Project}/Update`,
                method: HttpMethod.PUT,
                body: command
            }),
            invalidatesTags: [{type: ApiTags.Project}]
        }),
        deleteProject: builder.mutation<number, number>({
            query: id => ({
                url: `${ApiTags.Project}/Delete/${id}`,
                method: HttpMethod.DELETE,
            }),
            async onQueryStarted(_, {queryFulfilled}) {
                try {
                    await queryFulfilled
                    message.success(`Проект успешно удален`, 3)
                } catch (error) {
                    message.error(getErrorMessageFormBaseQuery(error as FetchBaseQueryError), 3)
                }
            },
            invalidatesTags: [{type: ApiTags.Project}]
        }),
    }),
});

export const {
    useGetProjectsByAgencyQuery,
    useCreateProjectMutation,
    useUpdateProjectMutation,
    useDeleteProjectMutation
} = projectApi