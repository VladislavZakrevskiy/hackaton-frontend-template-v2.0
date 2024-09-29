import React, { useState } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { Paper, Typography, Box, List, ListItem, TextField, IconButton } from "@mui/material";
import { Task, TaskCard, useCreateTaskMutation } from "@/entities/Task";
import { Add, Delete } from "@mui/icons-material";
import { useAppSelector } from "@/shared/lib/hooks";
import { useProjectActions } from "@/entities/Project/model/slices/ProjectSlice";
import { useDeleteStatusMutation } from "@/entities/Status/api/statusApi";

interface TaskColumnProps {
	columnId: number;
	title: string;
	taskIds: number[];
	tasks: Task[];
}

export const TaskColumn: React.FC<TaskColumnProps> = ({ columnId, title, taskIds, tasks }) => {
	const { project, current_space } = useAppSelector((state) => state.project);
	const [name, setName] = useState<string>("");
	const [createTaskDB] = useCreateTaskMutation();
	const { addTask, removeStatus } = useProjectActions();
	const [deleteStatusDB] = useDeleteStatusMutation();

	const createTask = async () => {
		const task = await createTaskDB({
			description: "",
			deadlineDate: new Date().toISOString(),
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

	const deleteStatus = () => {
		deleteStatusDB({ status_id: columnId });
		removeStatus({ status_id: columnId, space_id: tasks[0].spaceId });
	};

	return (
		<Paper
			sx={{
				width: 300,
				height: "100%",
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
				backgroundColor: "background.paper",
				color: "text.primary",
				padding: 2,
			}}
		>
			<Box component={"div"} className="flex gap-2 items-start">
				<Typography className="align-middle" variant="h6" sx={{ marginBottom: 2 }}>
					{title}
				</Typography>

				<IconButton onClick={deleteStatus}>
					<Delete />
				</IconButton>
			</Box>
			<Droppable droppableId={String(columnId)} type="TASK">
				{(provided, snapshot) => (
					<Box
						ref={provided.innerRef}
						{...provided.droppableProps}
						sx={{
							flexGrow: 1,
							width: 200,
							minHeight: 400,
							backgroundColor: snapshot.isDraggingOver ? "primary.light" : "",
							padding: 1,
							borderRadius: 1,
							transition: "background-color 0.2s ease",
							position: "relative",
						}}
					>
						<List sx={{ minHeight: "100%" }}>
							<ListItem
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
									<Draggable key={task.id} draggableId={String(task.id)} index={index}>
										{(provided) => (
											<div
												ref={provided.innerRef}
												{...provided.draggableProps}
												{...provided.dragHandleProps}
												style={{ ...provided.draggableProps.style, marginBottom: 8 }}
											>
												<TaskCard task={task} taskId={task.id} index={index} title={task.title} />
											</div>
										)}
									</Draggable>
								) : null;
							})}

							{provided.placeholder}
						</List>
					</Box>
				)}
			</Droppable>
		</Paper>
	);
};
