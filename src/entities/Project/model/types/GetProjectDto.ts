import { Space } from "@/entities/Space";
import { User } from "@/entities/User";

export interface Project {
	id: number;
	name: string;
	description: string
	owner: User;
	members: User[];
	spaces: Space[];
	image: string[];
}
