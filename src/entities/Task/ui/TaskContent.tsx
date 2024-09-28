import { FC } from "react";
import { Task } from "../model/types/GetTaskDto";
import { ListItemText } from "@mui/material";

interface TaskContentProps {
	task: Task;
}

export const TaskContent: FC<TaskContentProps> = ({ task }) => {
	return <ListItemText primary={task.title} />;
};
