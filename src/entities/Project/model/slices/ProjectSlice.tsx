import { Space } from "@/entities/Space";
import { Task } from "@/entities/Task";
import { buildSlice } from "@/shared/lib/store/buildSlice";
import { PayloadAction } from "@reduxjs/toolkit";
import { ProjectSchema } from "../types/ProjectSchema";
import { Project } from "../types/GetProjectDto";
import { Status } from "@/entities/Status";

const initialState: ProjectSchema = {
	project: null,
	current_space: null,
};

const ProjectSlice = buildSlice({
	name: "project",
	initialState,
	reducers: {
		setCurrentSpace: (store, action: PayloadAction<Space>) => {
			store.current_space = action.payload;
		},

		// STUPID CRUD!!!!!!!!
		addTask: (store, action: PayloadAction<Task & { space_id: number; status_id: number }>) => {
			const { space_id, status_id, ...task } = action.payload;
			const space_index = store.project?.spaces.findIndex(({ id }) => id == space_id);
			const status_index = store.project?.spaces?.[space_index!].statuses.findIndex(({ id }) => id == status_id);
			console.log(space_index, status_index);
			store.project?.spaces?.[space_index!].statuses[status_index!].tasks.push(task);
		},
		addStatus: (store, action: PayloadAction<{ space_id: number } & Status>) => {
			if (store.project?.spaces) {
				const { space_id, ...status } = action.payload;
				const space_index = store.project?.spaces.findIndex(({ id }) => id === space_id);
				store.project.spaces[space_index].statuses.push(status);
			}
		},

		addSpace: (store, action: PayloadAction<Space>) => {
			store.project?.spaces.push(action.payload);
		},

		removeTask: (store, action: PayloadAction<{ space_id: number; status_id: number; task_id: number }>) => {
			const { space_id, task_id, status_id } = action.payload;
			const space_index = store.project?.spaces.findIndex(({ id }) => id === space_id);
			if (space_index) {
				const status_index = store.project?.spaces[space_index].statuses.findIndex(({ id }) => id === status_id);
				if (status_index) {
					//@ts-ignore
					store.project!.spaces[space_index].statuses[status_index].tasks = store.project?.spaces[space_index].statuses[
						status_index
					].tasks.filter(({ id }) => id !== task_id);
				}
			}
		},

		removeSpace: (store, action: PayloadAction<{ space_id: number }>) => {
			if (store.project?.spaces) {
				store.project.spaces = store.project.spaces.filter(({ id }) => id !== action.payload.space_id);
			}
		},

		updateTask: (store, action: PayloadAction<Task & { space_id: number; status_id: number }>) => {
			const { space_id, status_id, ...task } = action.payload;
			const space_index = store.project?.spaces.findIndex(({ id }) => id === space_id);
			if (space_index) {
				const status_index = store.project?.spaces[space_index].statuses.findIndex(({ id }) => id === status_id);
				if (status_index) {
					const task_index = store.project?.spaces[space_index].statuses[status_index].tasks.findIndex(
						({ id }) => id === task.id,
					);
					store.project!.spaces[space_index].statuses[status_index].tasks[task_index!] = task;
				}
			}
		},

		removeStatus: (store, action: PayloadAction<{ status_id: number; space_id: number }>) => {
			const { space_id, status_id } = action.payload;
			const space_index = store.project?.spaces.findIndex(({ id }) => id === space_id);
			if (space_index) {
				// @ts-ignore
				store.project!.spaces[space_index].statuses = store.project?.spaces[space_index].statuses.filter(
					({ id }) => id === status_id,
				);
			}
		},

		updateStatus: (store, action: PayloadAction<Status & { space_id: number }>) => {
			if (store.project?.spaces) {
				const { space_id, ...status } = action.payload;
				const space_index = store.project?.spaces.findIndex(({ id }) => id === space_id);
				const status_index = store.project.spaces[space_index].statuses.findIndex(({ id }) => id === space_id);
				store.project.spaces[space_index].statuses[status_index!] = status;
			}
		},

		updateSpace: (store, action: PayloadAction<Space>) => {
			const { id: space_id } = action.payload;
			const space_index = store.project?.spaces.findIndex(({ id }) => id === space_id);
			if (space_index && store.project?.spaces?.[space_index]) {
				store.project.spaces[space_index] = action.payload;
			}
		},

		updateProject: (store, action: PayloadAction<Project>) => {
			store.project = action.payload;
		},

		addProject: (store, action: PayloadAction<Project>) => {
			store.project = action.payload;
		},
	},
});

export const { reducer: ProjectReducer, useActions: useProjectActions } = ProjectSlice;
