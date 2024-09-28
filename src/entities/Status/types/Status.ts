import { Task } from "@/entities/Task";

export interface Status {
	id: string;
	name: string;
	tasks: Task[];
}
