import { rtkApi } from "@/shared/api/rtkApi";
import { Task } from "../model/types/GetTaskDto";
import { AddTaskDto } from "../model/types/AddTask";

const userApi = rtkApi.injectEndpoints({
	endpoints: (build) => ({
		getMyTasks: build.query<Task[], void>({
			query: () => `/task`,
		}),

		getTaskById: build.query<Task, string>({
			query: (task_id) => `/task/${task_id}`,
		}),

		createTask: build.mutation<Task, AddTaskDto>({
			query: (data) => ({
				url: `/task`,
				method: "POST",
				body: data,
			}),
		}),

		deleteTask: build.query<Task, string>({ query: (task_id) => ({ url: `/task/${task_id}`, method: "DELETE" }) }),
	}),
});

export const { useCreateTaskMutation, useDeleteTaskQuery, useGetMyTasksQuery, useGetTaskByIdQuery } = userApi;
