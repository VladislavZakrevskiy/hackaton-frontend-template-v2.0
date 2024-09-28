export type { AddSpaceDto } from "./model/types/AddSpaceDto";
export type { Space } from "./model/types/GetSpaceDto";
export {
	useCreateSpaceMutation,
	useGetSpaceByIdQuery,
	useAddUserToSpaceMutation,
	useGetProjectSpacesQuery,
} from "./api/spaceApi";
