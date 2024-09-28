export type { AddSpaceDto } from "./model/types/AddSpaceDto";
export type { Space } from "./model/types/GetSpaceDto";
export {
	useCreateSpaceMutation,
	useDeleteSpaceMutation,
	useGetMySpacesQuery,
	useGetSpaceByIdQuery,
} from "./api/spaceApi";
