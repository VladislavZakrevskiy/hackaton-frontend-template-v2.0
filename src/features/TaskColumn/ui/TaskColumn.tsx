import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { Paper, Typography, Box, List, ListItem } from "@mui/material";
import { Task, TaskCard } from "@/entities/Task";
import { Add } from "@mui/icons-material";

interface TaskColumnProps {
	columnId: number;
	title: string;
	taskIds: number[];
	tasks: Task[];
	columnWidth: number;
	// onColumnResize: (newWidth: number) => void;
}

export const TaskColumn: React.FC<TaskColumnProps> = ({
	columnId,
	title,
	taskIds,
	tasks,
	columnWidth,
	// onColumnResize,
}) => {
	// useEffect(() => {
	// const handleMouseMove = (event: MouseEvent) => {
	// onColumnResize(event.clientX);
	// 	};

	// 	const handleMouseUp = () => {
	// 		window.removeEventListener("mousemove", handleMouseMove);
	// 		window.removeEventListener("mouseup", handleMouseUp);
	// 	};

	// 	const handleMouseDown = () => {
	// 		window.addEventListener("mousemove", handleMouseMove);
	// 		window.addEventListener("mouseup", handleMouseUp);
	// 	};

	// 	const resizer = document.getElementById(`resizer-${columnId}`);
	// 	if (resizer) {
	// 		resizer.addEventListener("mousedown", handleMouseDown);
	// 	}

	// 	return () => {
	// 		if (resizer) {
	// 			resizer.removeEventListener("mousedown", handleMouseDown);
	// 		}
	// 		window.removeEventListener("mousemove", handleMouseMove);
	// 		window.removeEventListener("mouseup", handleMouseUp);
	// 	};
	// }, [columnId]);
	return (
		<Paper
			sx={{
				width: columnWidth,
				height: "100%",
				display: "flex",
				flexDirection: "column",
				backgroundColor: "background.paper",
				color: "text.primary",
				padding: 2,
			}}
		>
			{/* Заголовок столбца */}
			<Typography variant="h6" sx={{ marginBottom: 2 }}>
				{title}
			</Typography>

			{/* Область для задач */}
			<Droppable droppableId={String(columnId)}>
				{(provided, snapshot) => (
					<Box
						ref={provided.innerRef}
						{...provided.droppableProps}
						sx={{
							flexGrow: 1,
							minHeight: 100,
							backgroundColor: snapshot.isDraggingOver ? "primary.light" : "",
							padding: 1,
							borderRadius: 1,
							transition: "background-color 0.2s ease",
						}}
					>
						<List sx={{ minHeight: "100%" }}>
							<ListItem
								ref={provided.innerRef}
								sx={{
									marginBottom: 1,
									display: "flex",
									justifyContent: "center",
									alignItems: "center",

									backgroundColor: "background.default",
									borderRadius: 1,
								}}
							>
								<Add fontSize="large" />
							</ListItem>
							{taskIds.map((taskId, index) => {
								const task = tasks.find((t) => t.id === taskId);
								return task ? (
									<TaskCard key={task.id} task={task} taskId={task.id} index={index} title={task.title} />
								) : null;
							})}
							<div
								id={`resizer-${columnId}`}
								style={{
									width: "5px",
									cursor: "ew-resize",
									backgroundColor: "transparent",
									height: "100%",
									position: "absolute",
									right: 0,
									top: 0,
								}}
							/>
							{provided.placeholder}
						</List>
					</Box>
				)}
			</Droppable>
		</Paper>
	);
};
