import React, { useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import { Paper, Typography, Box, List, ListItem, TextField, IconButton } from "@mui/material";
import { Task, TaskCard, useCreateTaskMutation } from "@/entities/Task";
import { Add } from "@mui/icons-material";
import { useAppSelector } from "@/shared/lib/hooks";
import { useProjectActions } from "@/entities/Project/model/slices/ProjectSlice";

interface TaskColumnProps {
	columnId: number;
	title: string;
	taskIds: number[];
	tasks: Task[];
	columnWidth: number;
}

export const TaskColumn: React.FC<TaskColumnProps> = ({ columnId, title, taskIds, tasks, columnWidth }) => {
	const { project, current_space } = useAppSelector((state) => state.project);
	const [name, setName] = useState<string>("");
	const [createTaskDB] = useCreateTaskMutation();
	const { addTask } = useProjectActions();

	const createTask = async () => {
		const task = await createTaskDB({
			description: "",
			name,
			project_id: project?.id || 0,
			space_id: current_space?.id || 0,
			status_id: columnId,
		}).unwrap();
		addTask({
			...task,
			status_id: columnId,
			space_id: current_space?.id || 0,
		});
	};
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
			<Typography variant="h6" sx={{ marginBottom: 2 }}>
				{title}
			</Typography>

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
									flexDirection: "column",
									backgroundColor: "background.default",
									borderRadius: 1,
								}}
							>
								<TextField value={name} onChange={(e) => setName(e.target.value)} />
								<IconButton onClick={createTask}>
									<Add fontSize="large" />
								</IconButton>
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
