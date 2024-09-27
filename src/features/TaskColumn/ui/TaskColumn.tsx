import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { Typography } from "@mui/material";
import { Task, TaskCard } from "@/entities/Task";

interface ColumnProps {
	column: {
		title: string;
		taskIds: string[];
	};
	tasks: {
		[key: string]: Task;
	};
}

const Column: React.FC<ColumnProps> = ({ column, tasks }) => {
	return (
		<Droppable droppableId={column.title}>
			{(provided) => (
				<div
					ref={provided.innerRef}
					{...provided.droppableProps}
					style={{
						border: "1px solid gray",
						borderRadius: "4px",
						padding: "8px",
						backgroundColor: "white",
						minHeight: "100px",
					}}
				>
					<Typography variant="h6">{column.title}</Typography>
					{column.taskIds.map((taskId, index) => {
						const task = tasks[taskId];
						return <TaskCard key={task.id} task={task} index={index} />;
					})}
					{provided.placeholder}
				</div>
			)}
		</Droppable>
	);
};

export default Column;
