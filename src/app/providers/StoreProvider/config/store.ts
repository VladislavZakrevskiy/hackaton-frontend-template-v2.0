import { Reducer, ReducersMapObject, configureStore } from "@reduxjs/toolkit";
import { StateSchema } from "./StateSchema";
import { UserReducer } from "@/entities/User";
import { createReducerManager } from "./reducerManager";
import { $api } from "@/shared/api/api";
import { rtkApi } from "@/shared/api/rtkApi";
import { ThemeReducer } from "../../ThemeProvider";
import { SidebarReducer } from "@/widgets/SideBar";
import { ModalManagerReducer } from "@/app/managers/ModalManager/ModalManager";
import { ProjectReducer } from "@/entities/Project";

export const createReduxStore = (initaialState?: StateSchema, asyncReducers?: ReducersMapObject<StateSchema>) => {
	const rootReducers: ReducersMapObject<StateSchema> = {
		...asyncReducers,
		user: UserReducer,
		theme: ThemeReducer,
		sidebar: SidebarReducer,
		project: ProjectReducer,
		modalManager: ModalManagerReducer,
		[rtkApi.reducerPath]: rtkApi.reducer,
	};

	const reducerManager = createReducerManager(rootReducers);

	const store = configureStore({
		// @ts-ignore
		reducer: reducerManager.reduce as Reducer<StateSchema>,
		devTools: __IS_DEV__,
		preloadedState: initaialState,
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware({
				thunk: {
					extraArgument: { api: $api },
				},
			}).concat(rtkApi.middleware),
	});

	// @ts-ignore
	store.reducerManager = reducerManager;

	return store;
};

export type AppDispatch = ReturnType<typeof createReduxStore>["dispatch"];
