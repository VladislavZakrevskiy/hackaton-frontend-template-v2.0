import { buildSlice } from "@/shared/lib/store/buildSlice";
import { ThemeSchema, ThemeModes } from "./ThemeSchema";
import { PayloadAction } from "@reduxjs/toolkit";

const initialState: ThemeSchema = {
	mode: "base",
};

const ThemeSlice = buildSlice({
	name: "theme",
	initialState,
	reducers: {
		setTheme: (store, action: PayloadAction<ThemeModes>) => {
			store.mode = action.payload;
		},
	},
});

export const { reducer: ThemeReducer, useActions: useThemeActions } = ThemeSlice;
