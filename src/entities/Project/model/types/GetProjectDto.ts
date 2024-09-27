import { GetSpaceDto } from "@/entities/Space";
import { User } from "@/entities/User";

export interface Project {
	id: number;
	name: string;
	owner: User;
	members: User[];
	spaces: GetSpaceDto;
}
