import React, { useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { Box, CircularProgress, debounce } from "@mui/material";
import { TaskColumn } from "@/features/TaskColumn";
import { Task } from "@/entities/Task";
import { COLUMN_WIDTH } from "@/shared/consts/localStorage";
import { Space, useCreateSpaceMutation } from "@/entities/Space";
import { Add } from "@mui/icons-material";
import { useProjectActions } from "@/entities/Project/model/slices/ProjectSlice";
import { useAppSelector } from "@/shared/lib/hooks";

interface TaskBoardProps {
	columns: Space[];
	tasks: Task[];
}

export const TaskBoard: React.FC<TaskBoardProps> = ({ columns: initialColumns, tasks }) => {
	const [columns, setColumns] = useState(initialColumns);
	const [columnWidth, setColumnWidth] = useState<number>(Number(localStorage.getItem(COLUMN_WIDTH)) ?? 200);
	const saveWidthToLocalStorage = debounce((width: number) => {
		localStorage.setItem(COLUMN_WIDTH, JSON.stringify(width));
	}, 300);
	const { project } = useAppSelector((state) => state.project);
	const { addSpace } = useProjectActions();
	const [addSpaceDB, { isLoading }] = useCreateSpaceMutation();

	const createSpace = async () => {
		const addedSpace = await addSpaceDB({ name: "", description: "", project_id: Number(project?.id) }).unwrap();
		console.log(addedSpace);
		addSpace(addedSpace);
	};

	const handleColumnResize = (newWidth: number) => {
		setColumnWidth(newWidth);
		saveWidthToLocalStorage(newWidth);
	};

	const handleDragEnd = (result: DropResult) => {
		const { destination, source, draggableId } = result;

		if (!destination) {
			return;
		}

		const sourceColumn = columns.find((col) => String(col.id) === source.droppableId);
		const destinationColumn = columns.find((col) => String(col.id) === destination.droppableId);

		if (sourceColumn && destinationColumn) {
			const sourceTaskIds = Array.from(sourceColumn.tasks.map(({ id }) => id));
			const destinationTaskIds = Array.from(destinationColumn.tasks.map(({ id }) => id));

			sourceTaskIds.splice(source.index, 1);
			destinationTaskIds.splice(destination.index, 0, Number(draggableId));

			const updatedColumns = columns.map((col) => {
				if (col.id === sourceColumn.id) {
					return { ...col, taskIds: sourceTaskIds };
				} else if (col.id === destinationColumn.id) {
					return { ...col, taskIds: destinationTaskIds };
				}
				return col;
			});

			setColumns(updatedColumns);
		}
	};

	return (
		<DragDropContext onDragEnd={handleDragEnd}>
			<Box display="flex" gap={2} sx={{ overflowX: "scroll", height: "100%", padding: 2 }}>
				{columns.map((column) => (
					<TaskColumn
						key={column.id}
						columnId={column.id}
						taskIds={column?.tasks?.map?.(({ id }) => id) || []}
						title={column.name}
						tasks={tasks.filter((task) => column.tasks.map(({ id }) => id).includes(task.id))}
						columnWidth={columnWidth}
						onColumnResize={handleColumnResize}
					/>
				))}
				<Box
					onClick={createSpace}
					sx={{
						width: 200,
						flexGrow: 1,
						minHeight: 100,
						backgroundColor: "primary.light",
						cursor: "pointer",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						padding: 1,
						borderRadius: 1,
						transition: "background-color 0.2s ease",
					}}
				>
					{isLoading ? <CircularProgress /> : <Add />}
				</Box>
			</Box>
		</DragDropContext>
	);
};
