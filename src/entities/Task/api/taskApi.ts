import { rtkApi } from "@/shared/api/rtkApi";
import { Task } from "../model/types/GetTaskDto";
import { AddTaskDto } from "../model/types/AddTask";

interface UrlProps {
	project_id: number;
	space_id: number;
	status_id: number;
}

const userApi = rtkApi.injectEndpoints({
	endpoints: (build) => ({
		getMyTasks: build.query<Task[], void>({
			query: () => `/tasks`,
		}),

		getTasksByStatus: build.query<Task[], UrlProps>({
			query: ({ project_id, space_id, status_id }) =>
				`/project/${project_id}/space/${space_id}/status/${status_id}/task`,
		}),

		createTask: build.mutation<Task, UrlProps & AddTaskDto>({
			query: ({ project_id, space_id, status_id, ...data }) => ({
				url: `/project/${project_id}/space/${space_id}/status/${status_id}/task`,
				method: "POST",
				body: data,
			}),
		}),

		deleteTask: build.query<Task, UrlProps>({
			query: ({ project_id, space_id, status_id }) => ({
				url: `/project/${project_id}/space/${space_id}/status/${status_id}/task`,
				method: "DELETE",
			}),
		}),
	}),
});

export const { useCreateTaskMutation, useDeleteTaskQuery, useGetTasksByStatusQuery, useGetMyTasksQuery } = userApi;
