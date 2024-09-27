import { Task } from "@/entities/Task";
import { User } from "@/entities/User";

export interface Space {
	id: number;
	name: string;
	description: string;
	image: string;
	owner: User;
	members: User[];
	tasks: Task[];
}
