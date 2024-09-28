export enum AppRoutes {
	MAIN = "main",
	NOT_FOUND = "not_found",
	LOGIN = "login",
	REGISTER = "register",
	PROJECT = 'project'
}

export const getRouteMain = () => "/";
export const getRouteLogin = () => "/login";
export const getRouteRegister = () => "/register";
export const getRouteUserPage = (user_id: string) => `/user/${user_id}`;
export const getRouteProjectPage = (project_id: string) => `/project/${project_id}`;
export const getRouteSpacePage = (space_id: string) => `/space/${space_id}`;
export const getRouteTaskPage = (task_id: string) => `/task/${task_id}`;
export const getRouteNotFound = () => "*";
