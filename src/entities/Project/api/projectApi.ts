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

		uploadAvatar: build.mutation<Project, { formdata: FormData; project_id: number }>({
			query: ({ formdata, project_id }) => ({ url: `/profile/${project_id}/upload`, body: formdata, method: "POST" }),
		}),

		createProject: build.mutation<Project, AddProjectDto>({
			query: (data) => ({ url: `/project`, body: data, method: "POST" }),
		}),

		deleteProject: build.mutation<Project, { project_id: number }>({
			query: ({ project_id }) => ({ url: `/project/${project_id}`, method: "DELETE" }),
		}),

		updateProject: build.mutation<Project, Partial<Project>>({
			query: (updatedProject) => ({ url: `/project/${updatedProject.id}`, body: updatedProject, method: "PUT" }),
		}),
	}),
});

export const {
	useCreateProjectMutation,
	useDeleteProjectMutation,
	useGetProjectByIdQuery,
	useUploadAvatarMutation,
	useGetProjectsQuery,
	useUpdateProjectMutation,
} = projectApi;
