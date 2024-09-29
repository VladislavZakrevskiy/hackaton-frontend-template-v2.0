import { FC } from "react";
import { Task } from "../model/types/GetTaskDto";
import { Card, Typography } from "@mui/material";

interface TaskContentProps {
	task: Task;
}

export const TaskContent: FC<TaskContentProps> = ({ task }) => {
	return (
		<Card className="p-3">
			<Typography variant="h6">{task.title}</Typography>
			<Typography variant="caption">
				от {task.createDate.split("T")?.[0]} до {task.deadlineDate.split("T")?.[0]}
			</Typography>
		</Card>
	);
};
