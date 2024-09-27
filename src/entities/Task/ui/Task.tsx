import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { Card as MCard, Typography } from "@mui/material";
import { Task as TaskType } from "../model/types/GetTaskDto";

interface CardProps {
	task: TaskType;
	index: number;
}

export const TaskCard: React.FC<CardProps> = ({ task, index }) => {
	return (
		<Draggable key={task.id} draggableId={String(task.id)} index={index}>
			{(provided) => (
				<MCard
					ref={provided.innerRef}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					style={{
						...provided.draggableProps.style,
						margin: "4px 0",
					}}
				>
					<Typography>{task.title}</Typography>
				</MCard>
			)}
		</Draggable>
	);
};
