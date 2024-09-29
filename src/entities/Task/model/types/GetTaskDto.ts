import { User } from "@/entities/User";

export interface Task {
	id: number;
	title: string;
	description: string;
	image: string[]
	checkpoints: {
		name: string
		is_check: boolean
	}
	place: number[]
	owner: User;
	executor: User;
	status: string;
	createDate: string
	deadlineDate: string
	projectId: number
	statusId: number
	spaceId: number
}
