import { rtkApi } from "@/shared/api/rtkApi";
import { Space } from "../model/types/GetSpaceDto";
import { AddSpaceDto } from "../model/types/AddSpaceDto";

interface UrlProps {
	project_id: number;
	space_id: number;
}

const userApi = rtkApi.injectEndpoints({
	endpoints: (build) => ({
		getProjectSpaces: build.query<Space[], { project_id: number }>({
			query: ({ project_id }) => `/project/${project_id}/space`,
		}),

		createSpace: build.mutation<Space, { project_id: number } & AddSpaceDto>({
			query: ({ project_id, ...data }) => ({ url: `/project/${project_id}/space`, body: data, method: "POST" }),
		}),

		getSpaceById: build.query<Space, UrlProps>({
			query: ({ project_id, space_id }) => ({
				url: `/project/${project_id}/space/${space_id}`,
			}),
		}),

		addUserToSpace: build.mutation<Space, UrlProps & { usernameToBeAdded: string }>({
			query: ({ project_id, space_id, usernameToBeAdded }) => ({
				url: `/project/${project_id}/space/${space_id}?usernameToBeAdded=${usernameToBeAdded}`,
				method: "POST",
			}),
		}),
	}),
});

export const { useCreateSpaceMutation, useGetSpaceByIdQuery, useAddUserToSpaceMutation, useGetProjectSpacesQuery } =
	userApi;
