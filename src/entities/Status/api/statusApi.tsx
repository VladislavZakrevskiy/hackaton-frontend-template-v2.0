import { rtkApi } from "@/shared/api/rtkApi";
import { Status } from "../types/Status";
import { AddStatusDto } from "../types/AddStatusDto";

interface UrlProps {
	project_id: string;
	space_id: string;
}

const userApi = rtkApi.injectEndpoints({
	endpoints: (build) => ({
		createStatus: build.mutation<Status, UrlProps & AddStatusDto>({
			query: ({ project_id, space_id, name }) => ({
				url: `/project/${project_id}/space/${space_id}`,
				method: "POST",
				body: { name },
			}),
		}),
	}),
});

export const { useCreateStatusMutation } = userApi;
