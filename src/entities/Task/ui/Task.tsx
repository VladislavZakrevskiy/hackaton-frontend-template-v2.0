import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { ListItem } from "@mui/material";
import { TaskContent } from "./TaskContent";
import { Task } from "../model/types/GetTaskDto";

interface TaskCardProps {
	taskId: number;
	index: number;
	title: string;
	task: Task;
}

export const TaskCard: React.FC<TaskCardProps> = ({ taskId, index, task }) => {
	return (
		<Draggable draggableId={String(taskId)} index={index}>
			{(provided) => (
				<ListItem
					ref={provided.innerRef}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					sx={{
						marginBottom: 1,
						backgroundColor: "background.default",
						borderRadius: 1,
					}}
				>
					<TaskContent task={task} />
				</ListItem>
			)}
		</Draggable>
	);
};
