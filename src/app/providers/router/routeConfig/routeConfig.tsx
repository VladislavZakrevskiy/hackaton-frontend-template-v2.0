import { NotFoundPage } from "@/pages/NotFoundPage";
import { LazyMainPage } from "@/pages/MainPage";
import {
	AppRoutes,
	getRouteLogin,
	getRouteMain,
	getRouteNotFound,
	getRouteRegister,
	getRouteSpacePage,
	getRouteUserPage,
} from "@/shared/consts/router";
import { AppRouteProps } from "@/shared/types/router";
import { LazyLoginPage } from "@/pages/Login";
import { LazyRegisterPage } from "@/pages/Register";
import { LazyProjectPage } from "@/pages/ProjectPage";
import { LazyUserPage } from "@/pages/User";

export const routeConfig: Record<AppRoutes, AppRouteProps> = {
	[AppRoutes.MAIN]: {
		path: getRouteMain(),
		element: <LazyMainPage />,
		authOnly: true,
	},
	[AppRoutes.NOT_FOUND]: {
		path: getRouteNotFound(),
		element: <NotFoundPage />,
	},
	[AppRoutes.LOGIN]: {
		path: getRouteLogin(),
		element: <LazyLoginPage />,
	},
	[AppRoutes.REGISTER]: {
		path: getRouteRegister(),
		element: <LazyRegisterPage />,
	},
	[AppRoutes.PROJECT]: {
		path: getRouteSpacePage(":project_id", ":space_id"),
		element: <LazyProjectPage />,
		authOnly: true,
	},
	[AppRoutes.USER]: {
		path: getRouteUserPage(":id"),
		element: <LazyUserPage />,
	},
};
