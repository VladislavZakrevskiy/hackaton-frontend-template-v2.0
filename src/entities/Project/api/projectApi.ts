import { rtkApi } from "@/shared/api/rtkApi";
import { Project } from "../model/types/GetProjectDto";
import { AddProjectDto } from "../model/types/AddProjectDto";

const projectApi = rtkApi.injectEndpoints({
	endpoints: (build) => ({
		getProjects: build.query<Project[], void>({
			query: () => "/project",
		}),

		getProjectById: build.query<Project, string>({
			query: (project_id) => `/project/${project_id}`,
		}),

		createProject: build.mutation<Project, AddProjectDto>({
			query: (data) => ({ url: `/project`, body: data, method: "POST" }),
		}),

		deleteProject: build.mutation<Project, string>({
			query: (project_id) => ({ url: `/project/${project_id}`, method: "DELETE" }),
		}),
	}),
});

export const { useCreateProjectMutation, useDeleteProjectMutation, useGetProjectByIdQuery, useGetProjectsQuery } =
	projectApi;
