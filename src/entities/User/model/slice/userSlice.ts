import { PayloadAction } from "@reduxjs/toolkit";
import { UserSchema } from "../types/UserSchema";
import { buildSlice } from "@/shared/lib/store/buildSlice";
import { User } from "../types/ProfileUserDto";

const initialState: UserSchema = {
	authData: undefined,
};

const userSlice = buildSlice({
	name: "user",
	initialState,
	reducers: {
		setAuthData: (state, action: PayloadAction<User>) => {
			state.authData = action.payload;
		},
	},
});

export const { reducer: UserReducer, actions: UserActions, useActions: useUserActions } = userSlice;
