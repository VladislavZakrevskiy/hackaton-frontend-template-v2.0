import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable, DropResult } from "react-beautiful-dnd";
import { Box, IconButton } from "@mui/material";
import { TaskColumn } from "@/features/TaskColumn";
import { Task } from "@/entities/Task";
import { Add } from "@mui/icons-material";
import { Status } from "@/entities/Status";
import { Modals, useModalManagerActions } from "@/app/managers";

interface TaskBoardProps {
	columns: Status[];
	tasks: Task[];
}

export const TaskBoard: React.FC<TaskBoardProps> = ({ columns: initialColumns, tasks }) => {
	const [columns, setColumns] = useState(initialColumns);
	const { setIsOpen } = useModalManagerActions();

	useEffect(() => {
		setColumns(initialColumns);
	}, [initialColumns]);

	const checkWithinBounds = (result: DropResult): boolean => {
		const { destination } = result;
		if (!destination) return false;

		const destinationIndex = destination.index;
		const columnElement = document.getElementById(destination.droppableId);
		if (columnElement) {
			const rect = columnElement.getBoundingClientRect();
			const columnHeight = rect.height;
			const taskHeight = 50;

			if (columnHeight - taskHeight * destinationIndex <= 200) {
				return false;
			}
		}
		return true;
	};

	const onDragEnd = (result: DropResult) => {
		const { source, destination, type } = result;

		if (!destination || !checkWithinBounds(result)) return;

		if (destination.droppableId === source.droppableId && destination.index === source.index) {
			return;
		}

		if (type === "COLUMN") {
			const newColumnOrder = Array.from(columns);
			const [movedColumn] = newColumnOrder.splice(source.index, 1);
			newColumnOrder.splice(destination.index, 0, movedColumn);

			setColumns(newColumnOrder);
			return;
		}

		const startColumn = columns.find((col) => col.id === Number(source.droppableId));
		const endColumn = columns.find((col) => col.id === Number(destination.droppableId));

		if (!startColumn || !endColumn) return;

		if (startColumn === endColumn) {
			const newTaskOrder = Array.from(startColumn.tasks);
			const [movedTask] = newTaskOrder.splice(source.index, 1);
			newTaskOrder.splice(destination.index, 0, movedTask);

			const newColumn = {
				...startColumn,
				tasks: newTaskOrder,
			};

			setColumns((prev) => prev.map((col) => (col.id === newColumn.id ? newColumn : col)));
			return;
		}

		const startTaskOrder = Array.from(startColumn.tasks);
		const [movedTask] = startTaskOrder.splice(source.index, 1);
		const newStartColumn = {
			...startColumn,
			tasks: startTaskOrder,
		};

		const endTaskOrder = Array.from(endColumn.tasks);
		endTaskOrder.splice(destination.index, 0, movedTask);
		const newEndColumn = {
			...endColumn,
			tasks: endTaskOrder,
		};

		setColumns((prev) =>
			prev.map((col) =>
				col.id === newStartColumn.id ? newStartColumn : col.id === newEndColumn.id ? newEndColumn : col,
			),
		);
	};

	return (
		<div className="p-3 h-full" style={{ overflowX: "auto" }}>
			<DragDropContext onDragEnd={onDragEnd}>
				<Droppable droppableId="all-columns" direction="horizontal" type="COLUMN">
					{(provided) => (
						<div style={{ display: "flex", height: "100%" }} {...provided.droppableProps} ref={provided.innerRef}>
							<Box
								sx={{
									width: 300,
									flexGrow: 1,
									minHeight: 200,
									backgroundColor: "primary.light",
									cursor: "pointer",
									display: "flex",
									justifyContent: "start",
									alignItems: "center",
									flexDirection: "column",
									padding: 1,
									borderRadius: 1,
									transition: "background-color 0.2s ease",
									position: "relative",
								}}
							>
								<IconButton onClick={() => setIsOpen({ isOpen: true, modal: Modals.CREATE_STATUS })}>
									{<Add fontSize="large" color="action" />}
								</IconButton>
							</Box>
							{columns.map((column, index) => (
								<Draggable key={column.id} draggableId={String(column.id)} index={index}>
									{(provided) => (
										<div
											ref={provided.innerRef}
											{...provided.draggableProps}
											{...provided.dragHandleProps}
											style={{
												...provided.draggableProps.style,
												margin: "0 8px",
												minWidth: 300,
											}}
										>
											<TaskColumn
												key={column.id}
												columnId={column.id}
												taskIds={column?.tasks?.map?.(({ id }) => id) || []}
												title={column.name}
												tasks={tasks.filter((task) => column?.tasks?.map(({ id }) => id).includes(task?.id))}
												columnWidth={200}
											/>
										</div>
									)}
								</Draggable>
							))}

							{provided.placeholder}
						</div>
					)}
				</Droppable>
			</DragDropContext>
		</div>
	);
};
