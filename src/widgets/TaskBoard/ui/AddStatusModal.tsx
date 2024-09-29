import { Modals, useModalManagerActions } from "@/app/managers";
import { useProjectActions } from "@/entities/Project/model/slices/ProjectSlice";
import { useCreateStatusMutation } from "@/entities/Status";
import { useAppSelector } from "@/shared/lib/hooks";
import { Button, Modal, Paper, TextField, Typography } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

interface AddStatusFormData {
	name: string;
}

export const AddStatusModal = () => {
	const { current_space, project } = useAppSelector((state) => state.project);
	const { currentModal, modals } = useAppSelector((state) => state.modalManager);
	const { setIsOpen } = useModalManagerActions();
	const { addStatus } = useProjectActions();
	const { t } = useTranslation();
	const [createStatus] = useCreateStatusMutation();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<AddStatusFormData>();

	const onSubmit: SubmitHandler<AddStatusFormData> = async (data) => {
		const task = await createStatus({
			name: data.name,
			project_id: project?.id || 0,
			space_id: current_space?.id || 0,
		}).unwrap();
		addStatus({ ...task, space_id: current_space?.id || 0 });
		setIsOpen({ isOpen: false, modal: currentModal || Modals.CREATE_STATUS });
	};

	if (!currentModal) {
		return <div></div>;
	}
	const { isOpen } = modals[currentModal];

	return (
		<Modal
			open={isOpen}
			onClose={() => setIsOpen({ modal: currentModal, isOpen: false })}
			className="flex justify-center items-center"
		>
			<Paper
				sx={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					mt: 4,
					p: 3,
					border: "7px solid",
					borderColor: "primary.main",
					gap: 5,
				}}
			>
				<Typography variant="h6" className="text-center">
					{t("create status")}
				</Typography>

				<form className="flex flex-col justify-center items-center gap-2" onSubmit={handleSubmit(onSubmit)}>
					<TextField
						label={t("name")}
						{...register("name", { required: t("nameRequired") })}
						error={!!errors.name?.message}
						helperText={errors.name?.message}
					/>

					<Button type="submit">{t("create status")}</Button>
				</form>
			</Paper>
		</Modal>
	);
};
