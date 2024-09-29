import { buildSlice } from "@/shared/lib/store/buildSlice";
import { EditTaskModalSchema } from "../types/EditTaskModalSchema";
import { PayloadAction } from "@reduxjs/toolkit";
import { Task } from "@/entities/Task";

const initialState: EditTaskModalSchema = {
	task: null,
};

const EditTaskModalSlice = buildSlice({
	name: "EditTaskModal",
	initialState,
	reducers: {
		setTask: (store, action: PayloadAction<Task>) => {
			store.task = action.payload;
		},
	},
});

export const { reducer: EditTaskModalReducer, useActions: useEditTaskModalActions } = EditTaskModalSlice;
