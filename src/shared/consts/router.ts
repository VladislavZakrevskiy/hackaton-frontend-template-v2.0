export enum AppRoutes {
	MAIN = "main",
	NOT_FOUND = "not_found",
	LOGIN = "login",
	REGISTER = "register",
	PROJECT = "project",
	USER = "user",
}

export const getRouteMain = () => "/";
export const getRouteLogin = () => "/login";
export const getRouteRegister = () => "/register";
export const getRouteUserPage = (user_id: string | number) => `/user/${user_id}`;
export const getRouteSpacePage = (project_id: string | number, space_id: string | number) =>
	`/project/${project_id}/space/${space_id}`;
export const getRouteNotFound = () => "*";
export const getRouteTaskPage = (task_id: number | string) => `/task/${task_id}`;
