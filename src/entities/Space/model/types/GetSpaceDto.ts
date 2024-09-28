import { Status } from "@/entities/Status";
import { User } from "@/entities/User";

export interface Space {
	id: number;
	name: string;
	description: string;
	owner: User;
	members: User[];
	statuses: Status[]
	// tasks: Task[];

}
