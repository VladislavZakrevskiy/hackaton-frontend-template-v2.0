import { rtkApi } from "@/shared/api/rtkApi";
import { Space } from "../model/types/GetSpaceDto";
import { AddSpaceDto } from "../model/types/AddSpaceDto";

const userApi = rtkApi.injectEndpoints({
	endpoints: (build) => ({
		getMySpaces: build.query<Space[], void>({
			query: () => `/space`,
		}),

		getSpaceById: build.query<Space, string>({
			query: (space_id) => `/space/${space_id}`,
		}),

		createSpace: build.mutation<Space, AddSpaceDto>({
			query: (data) => ({
				url: "/space",
				body: data,
				method: "POST",
			}),
		}),

		deleteSpace: build.mutation<Space, string>({
			query: (space_id) => ({ url: `/space/${space_id}`, method: "DELETE" }),
		}),
	}),
});

export const { useCreateSpaceMutation, useDeleteSpaceMutation, useGetMySpacesQuery, useGetSpaceByIdQuery } = userApi;
