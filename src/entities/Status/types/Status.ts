import { Task } from "@/entities/Task";

export interface Status {
	id: number;
	name: string;
	tasks: Task[];
}
