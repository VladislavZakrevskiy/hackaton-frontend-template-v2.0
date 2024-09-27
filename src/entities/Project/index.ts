export type { AddProjectDto } from "./model/types/AddProjectDto";
export type { Project } from "./model/types/GetProjectDto";
export {
	useCreateProjectMutation,
	useDeleteProjectMutation,
	useGetProjectByIdQuery,
	useGetProjectsQuery,
} from "./api/projectApi";
