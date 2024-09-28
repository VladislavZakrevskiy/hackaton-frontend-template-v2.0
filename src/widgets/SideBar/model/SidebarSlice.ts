import { buildSlice } from "@/shared/lib/store/buildSlice";
import { SidebarSchema } from "./SidebarSchema";
import { PayloadAction } from "@reduxjs/toolkit";

const initialState: SidebarSchema = {
	isOpen: false,
};

const SidebarSlice = buildSlice({
	name: "sidebar",
	initialState,
	reducers: {
		setIsOpen: (store, action: PayloadAction<boolean>) => {
			store.isOpen = action.payload;
		},
	},
});

export const { reducer: SidebarReducer, useActions: useSidebarActions } = SidebarSlice;
