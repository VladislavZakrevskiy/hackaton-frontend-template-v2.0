import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { Button, ListItem } from "@mui/material";
import { TaskContent } from "./TaskContent";
import { Task } from "../model/types/GetTaskDto";
import { Modals, useModalManagerActions } from "@/app/managers";
import { useEditTaskModalActions } from "@/features/EditTaskModal";
import { useTranslation } from "react-i18next";

interface TaskCardProps {
	taskId: number;
	index: number;
	title: string;
	task: Task;
}

export const TaskCard: React.FC<TaskCardProps> = ({ taskId, index, task }) => {
	const { t } = useTranslation();
	const { setIsOpen } = useModalManagerActions();
	const { setTask } = useEditTaskModalActions();

	const openEditModal = () => {
		setTask(task);
		setIsOpen({ modal: Modals.EDIT_TASK, isOpen: true });
	};

	return (
		<Draggable draggableId={String(taskId)} index={index}>
			{(provided) => (
				<ListItem
					className="flex flex-col justify-center items-center gap-2"
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
					<Button onClick={openEditModal}>{t("edit")}</Button>
				</ListItem>
			)}
		</Draggable>
	);
};
