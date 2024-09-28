import { Space } from "@/entities/Space";
import { Task } from "@/entities/Task";
import { buildSlice } from "@/shared/lib/store/buildSlice";
import { PayloadAction } from "@reduxjs/toolkit";
import { ProjectSchema } from "../types/ProjectSchema";
import { Project } from "../types/GetProjectDto";

const initialState: ProjectSchema = {
	project: null,
};

const ProjectSlice = buildSlice({
	name: "project",
	initialState,
	reducers: {
		addTask: (store, action: PayloadAction<Task & { space_id: number }>) => {
			const { space_id, ...task } = action.payload;
			const space_index = store.project?.spaces.findIndex(({ id }) => id === space_id);
			if (space_index && store.project?.spaces?.[space_index]) {
				store.project?.spaces?.[space_index].tasks.push(task);
			}
		},

		addSpace: (store, action: PayloadAction<Space>) => {
			store.project?.spaces.push(action.payload);
		},

		removeTask: (store, action: PayloadAction<{ space_id: number; task_id: number }>) => {
			const { space_id, task_id } = action.payload;
			const space_index = store.project?.spaces.findIndex(({ id }) => id === space_id);
			if (space_index && store.project?.spaces && store.project?.spaces?.[space_index]) {
				store.project.spaces[space_index].tasks = store.project?.spaces[space_index].tasks.filter(
					({ id }) => id !== task_id,
				);
			}
		},

		removeSpace: (store, action: PayloadAction<{ space_id: number }>) => {
			if (store.project?.spaces) {
				store.project.spaces = store.project.spaces.filter(({ id }) => id !== action.payload.space_id);
			}
		},

		updateTask: (store, action: PayloadAction<Task & { space_id: number }>) => {
			const { space_id, ...task } = action.payload;
			const space_index = store.project?.spaces.findIndex(({ id }) => id === space_id);
			if (space_index && store.project?.spaces?.[space_index]) {
				for (let i = 0; i < store.project?.spaces?.[space_index].tasks.length; i++) {
					const task_candidate = store.project?.spaces?.[space_index].tasks[i];
					if (task.id === task_candidate.id) {
						store.project.spaces[space_index].tasks[i] = task;
					}
				}
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
