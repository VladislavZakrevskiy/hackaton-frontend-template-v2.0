import { rtkApi } from "@/shared/api/rtkApi";
import { User } from "../model/types/ProfileUserDto";
import { LoginDto, RegisterDto } from "../model/types/SignInDto";

const userApi = rtkApi.injectEndpoints({
	endpoints: (build) => ({
		getMe: build.query<User, void>({
			query: () => "/profile",
		}),

		getUser: build.query<User, string>({
			query: (user_id) => "/profile/" + user_id,
		}),

		getProjectUsers: build.query<User[], string>({
			query: (project_id) => `/project/${project_id}/user`,
		}),

		refresh: build.query<string, void>({
			query: () => "/refresh",
		}),

		register: build.mutation<User & { accessToken: string }, RegisterDto>({
			query: (authData) => ({
				url: "/registration",
				body: authData,
				method: "POST",
			}),
		}),

		signIn: build.mutation<User & { accessToken: string }, LoginDto>({
			query: (authData) => ({
				url: "/login",
				body: authData,
				method: "POST",
			}),
		}),

		signOut: build.mutation({
			query: () => "/logout",
		}),
	}),
});

export const {
	useRegisterMutation,
	useGetProjectUsersQuery,
	useSignInMutation,
	useSignOutMutation,
	useGetMeQuery,
	useGetUserQuery,
	useLazyRefreshQuery,
} = userApi;
