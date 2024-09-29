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
			query: () => `/project/task?limit=10`,
		}),

		uploadAvatar: build.mutation<Task, { formdata: FormData; task_id: number }>({
			query: ({ formdata, task_id }) => ({ url: `/profile/task/${task_id}/upload`, body: formdata, method: "POST" }),
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

		deleteTask: build.query<Task, { task_id: number }>({
			query: ({ task_id }) => ({
				url: `/project/task/${task_id}`,
				method: "DELETE",
			}),
		}),

		updateTask: build.mutation<Task, Partial<Task>>({
			query: (updatedTask) => ({ url: "/project/task/" + updatedTask.id, method: "PUT", body: updatedTask }),
		}),
	}),
});

export const {
	useCreateTaskMutation,
	useUploadAvatarMutation,
	useDeleteTaskQuery,
	useGetTasksByStatusQuery,
	useGetMyTasksQuery,
	useUpdateTaskMutation,
} = userApi;
