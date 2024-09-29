import { AddProjectModal } from "@/features/AddProjectModal";
import { EditTaskModal } from "@/features/EditTaskModal";
import { AddStatusModal } from "@/widgets/TaskBoard/ui/AddStatusModal";
import { ReactNode } from "react";

export enum Modals {
	CREATE_PROJECT = "CREATE_PROJECT",
	EDIT_TASK = "EDIT_TASK",
	CREATE_STATUS = "CREATE_STATUS",
}

export const modals: Record<Modals, ReactNode> = {
	[Modals.CREATE_PROJECT]: <AddProjectModal />,
	[Modals.EDIT_TASK]: <EditTaskModal />,
	[Modals.CREATE_STATUS]: <AddStatusModal />,
};

export interface ModalManagerSchema {
	modals: Record<Modals, { isOpen: boolean }>;
	currentModal: Modals | null;
}
