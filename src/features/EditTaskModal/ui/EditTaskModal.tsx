import { ReactNode, useState } from "react";
import { Modal, List, ListItem, Typography, Paper, Button } from "@mui/material";
import { useAppSelector } from "@/shared/lib/hooks";
import { Modals, useModalManagerActions } from "@/app/managers";
import { DrawingBoard } from "./blocks/DrawingBoard";
import { ClickableMap } from "./blocks/MapBlock";
import { TextEditor } from "./blocks/TextEditor";
import { DynamicModuleLoader } from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { useTranslation } from "react-i18next";
import { Form } from "./blocks/FormData";
import { EditTaskModalReducer } from "../model/slices/EditTaskModalSlice";

type TaskFormType = "TextEditor" | "Map" | "Drawing" | "Form";
const taskForms: Record<TaskFormType, ReactNode> = {
	Drawing: <DrawingBoard />,
	Map: <ClickableMap />,
	TextEditor: <TextEditor />,
	Form: <Form />,
};

export const EditTaskModal = () => {
	const { t } = useTranslation();
	const { currentModal, modals } = useAppSelector((state) => state.modalManager);
	const { setIsOpen } = useModalManagerActions();
	const [selectedForm, setSelectedForm] = useState<TaskFormType>("Map");
	const { isOpen } = modals[currentModal || Modals.CREATE_PROJECT];

	return (
		<DynamicModuleLoader reducers={{ editTask: EditTaskModalReducer }}>
			<Modal
				className="flex justify-center items-center"
				open={isOpen}
				onClose={() => setIsOpen({ modal: currentModal || Modals.EDIT_TASK, isOpen: false })}
			>
				<Paper
					sx={{
						m: 13,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						mt: 4,
						p: 3,
						flexGrow: 1,
						height: "75%",
						border: "7px solid",
						borderColor: "primary.main",
						gap: 5,
					}}
				>
					<Typography variant="h6" className="text-center">
						{t("edit task")}
					</Typography>

					<div className="grid justify-center items-center grid-cols-[1fr_10fr]">
						<List className="flex flex-col justify-center items-center gap-4">
							{Object.keys(taskForms).map((key) => (
								<ListItem className="cursor-pointer" key={key} onClick={() => setSelectedForm(key as TaskFormType)}>
									<Typography variant="h6">{key}</Typography>
								</ListItem>
							))}
						</List>
						{taskForms[selectedForm]}
					</div>

					<Button>{t("save")}</Button>
				</Paper>
			</Modal>
		</DynamicModuleLoader>
	);
};
