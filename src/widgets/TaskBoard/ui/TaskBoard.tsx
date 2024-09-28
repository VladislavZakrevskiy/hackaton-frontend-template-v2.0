import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable, DropResult } from "react-beautiful-dnd";
import { Box, CircularProgress, IconButton, TextField } from "@mui/material";
import { TaskColumn } from "@/features/TaskColumn";
import { Task } from "@/entities/Task";
import { Add } from "@mui/icons-material";
import { useProjectActions } from "@/entities/Project/model/slices/ProjectSlice";
import { useAppSelector } from "@/shared/lib/hooks";
import { Status, useCreateStatusMutation } from "@/entities/Status";
import { useTranslation } from "react-i18next";

interface TaskBoardProps {
	columns: Status[];
	tasks: Task[];
}

export const TaskBoard: React.FC<TaskBoardProps> = ({ columns: initialColumns, tasks }) => {
	const { t } = useTranslation();
	const [columns, setColumns] = useState(initialColumns);
	// const [columnWidth, setColumnWidth] = useState<number>(Number(localStorage.getItem(COLUMN_WIDTH)) ?? 200);
	// const saveWidthToLocalStorage = debounce((width: number) => {
	// 	localStorage.setItem(COLUMN_WIDTH, JSON.stringify(width));
	// }, 300);

	const [name, setName] = useState<string>("");
	const { project, current_space } = useAppSelector((state) => state.project);
	const { addStatus } = useProjectActions();
	const [addStatusDB, { isLoading }] = useCreateStatusMutation();

	const createSpace = async () => {
		const addedSpace = await addStatusDB({
			name,
			project_id: project?.id || 0,
			space_id: current_space?.id || 0,
		}).unwrap();
		addStatus({ ...addedSpace, space_id: current_space?.id || 0 });
	};

	// const handleColumnResize = (newWidth: number) => {
	// setColumnWidth(newWidth);
	// saveWidthToLocalStorage(newWidth);
	// };

	const onDragEnd = (result: DropResult) => {
		const { destination, source, type } = result;

		// Если нет destination (за пределы допустимого), ничего не делаем
		if (!destination) return;

		// Если элемент был перемещен в то же место
		if (destination.droppableId === source.droppableId && destination.index === source.index) {
			return;
		}

		// Перетаскивание столбцов
		if (type === "COLUMN") {
			const newColumnOrder = Array.from(columns);
			const [movedColumn] = newColumnOrder.splice(source.index, 1);
			newColumnOrder.splice(destination.index, 0, movedColumn);

			setColumns(newColumnOrder);
			return;
		}

		// Перетаскивание задач между столбцами
		const startColumn = columns.find((col) => col.id === Number(source.droppableId));
		const endColumn = columns.find((col) => col.id === Number(destination.droppableId));

		if (!startColumn || !endColumn) return;

		// Перемещение задачи в пределах одного столбца
		if (startColumn === endColumn) {
			const newTaskIds = Array.from(startColumn.tasks.map(({ id }) => id));
			const [movedTask] = newTaskIds.splice(source.index, 1);
			newTaskIds.splice(destination.index, 0, movedTask);

			const newColumn = {
				...startColumn,
				taskIds: newTaskIds,
			};

			setColumns((prev) => prev.map((col) => (col.id === newColumn.id ? newColumn : col)));
			return;
		}

		// Перемещение задачи в другой столбец
		const startTaskIds = Array.from(startColumn.tasks.map(({ id }) => id));
		const [movedTask] = startTaskIds.splice(source.index, 1);
		const newStartColumn = {
			...startColumn,
			taskIds: startTaskIds,
		};

		const endTaskIds = Array.from(endColumn.tasks.map(({ id }) => id));
		endTaskIds.splice(destination.index, 0, movedTask);
		const newEndColumn = {
			...endColumn,
			taskIds: endTaskIds,
		};

		setColumns((prev) =>
			prev.map((col) =>
				col.id === newStartColumn.id ? newStartColumn : col.id === newEndColumn.id ? newEndColumn : col,
			),
		);
	};

	return (
		<div className="p-3 h-full">
			<DragDropContext onDragEnd={onDragEnd}>
				<Droppable droppableId="all-columns" direction="horizontal" type="COLUMN">
					{(provided) => (
						<div style={{ display: "flex", height: "100%" }} {...provided.droppableProps} ref={provided.innerRef}>
							<Box
								sx={{
									width: 200,
									flexGrow: 1,
									minHeight: 100,
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
								<TextField value={name} onChange={(e) => setName(e.target.value)} label={t("status")} />
								<IconButton onClick={createSpace}>
									{isLoading ? <CircularProgress /> : <Add fontSize="large" color="action" />}
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
												minWidth: "200px",
											}}
										>
											<TaskColumn
												key={column.id}
												columnId={column.id}
												taskIds={column?.tasks?.map?.(({ id }) => id) || []}
												title={column.name}
												tasks={tasks.filter((task) => column.tasks.map(({ id }) => id).includes(task.id))}
												columnWidth={200}
												// onColumnResize={handleColumnResize}
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
