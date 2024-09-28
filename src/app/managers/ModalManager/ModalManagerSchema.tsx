import { AddProjectModal } from "@/features/AddProjectModal";
import { ReactNode } from "react";

export enum Modals {
	CREATE_PROJECT = "CREATE_PROJECT",
}

export const modals: Record<Modals, ReactNode> = {
	[Modals.CREATE_PROJECT]: <AddProjectModal />,
};

export interface ModalManagerSchema {
	modals: Record<Modals, { isOpen: boolean }>;
	currentModal: Modals | null;
}
