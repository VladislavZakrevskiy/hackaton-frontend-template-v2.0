import { User } from "@/entities/User";

export interface Task {
	id: number;
	title: string;
	owner: User;
	executor: User;
	status: string;
}
