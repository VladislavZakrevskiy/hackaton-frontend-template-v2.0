import { rtkApi } from "@/shared/api/rtkApi";
import { User } from "../model/types/ProfileUserDto";

const userApi = rtkApi.injectEndpoints({
	endpoints: (build) => ({
		searchUser: build.query<User[], string>({
			query: (q) => `/project/user/search?q=${q}`,
		}),

		findUserBySpaceId: build.query<User[], number>({
			query: (spaceId) => `/project/user/search/byspace/${spaceId}`,
		}),

		findUserByProjectId: build.query<User[], number>({
			query: (project_id) => `/project/user/search/byproj/${project_id}`,
		}),

		findUserById: build.query<User, number>({
			query: (id) => `/project/user/search/byproj/${id}`,
		}),
	}),
});

export const {
	useFindUserByIdQuery,
	useFindUserByProjectIdQuery,
	useFindUserBySpaceIdQuery,
	useLazyFindUserByIdQuery,
	useLazyFindUserByProjectIdQuery,
	useLazyFindUserBySpaceIdQuery,
	useLazySearchUserQuery,
} = userApi;
