import { rtkApi } from "@/shared/api/rtkApi";
import { User } from "../model/types/ProfileUserDto";
import { LoginDto, RegisterDto } from "../model/types/SignInDto";
import { RefreshDto } from "../model/types/RefreshDto";

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

		refresh: build.query<RefreshDto, void>({
			query: () => "/refresh",
		}),

		register: build.mutation<void, RegisterDto>({
			query: (authData) => ({
				url: "/registration",
				body: authData,
				method: "POST",
			}),
		}),

		signIn: build.mutation<{ accessToken: string; refreshToken: string }, LoginDto>({
			query: (authData) => ({
				url: "/auth",
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
	useLazyGetMeQuery,
} = userApi;
