import { rtkApi } from "@/shared/api/rtkApi";
import { Status } from "../types/Status";
import { AddStatusDto } from "../types/AddStatusDto";

interface UrlProps {
	project_id: number;
	space_id: number;
}

const userApi = rtkApi.injectEndpoints({
	endpoints: (build) => ({
		createStatus: build.mutation<Status, UrlProps & AddStatusDto>({
			query: ({ project_id, space_id, name }) => ({
				url: `/project/${project_id}/space/${space_id}/status`,
				method: "POST",
				body: { name },
			}),
		}),

		deleteStatus: build.mutation<Status, { status_id: number }>({
			query: ({ status_id }) => ({
				url: `/project/status/${status_id}`,
				method: "DELETE",
			}),
		}),
	}),
});

export const { useCreateStatusMutation, useDeleteStatusMutation } = userApi;
