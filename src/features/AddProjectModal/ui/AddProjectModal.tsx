import { useModalManagerActions } from "@/app/managers/ModalManager/ModalManager";
import { useCreateProjectMutation } from "@/entities/Project";
import { useCreateSpaceMutation } from "@/entities/Space";
import { getRouteProjectPage } from "@/shared/consts/router";
import { useAppSelector } from "@/shared/lib/hooks";
import { Button, Modal, Paper, TextField, Typography } from "@mui/material";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

interface AddProjectFormData {
	name: string;
	space_desc: string;
	space_name: string;
}

export const AddProjectModal = () => {
	const { currentModal, modals } = useAppSelector((state) => state.modalManager);
	const { setIsOpen } = useModalManagerActions();
	const { t } = useTranslation();
	const [createProject, { isSuccess, data }] = useCreateProjectMutation();
	const [createSpace] = useCreateSpaceMutation();
	const nav = useNavigate();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<AddProjectFormData>();

	const onSubmit: SubmitHandler<AddProjectFormData> = async (data) => {
		const { id } = await createProject({ name: data.name }).unwrap();
		await createSpace({ project_id: id, description: data.space_desc, name: data.space_name });
	};

	useEffect(() => {
		if (isSuccess) {
			nav(getRouteProjectPage(data.id));
		}
	}, [isSuccess]);

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
					{t("create project")}
				</Typography>

				<form className="flex flex-col justify-center items-center gap-2" onSubmit={handleSubmit(onSubmit)}>
					<TextField
						label={t("name")}
						{...register("name", { required: t("nameRequired") })}
						error={!!errors.name?.message}
						helperText={errors.name?.message}
					/>
					<TextField
						label={t("space name")}
						{...register("space_name", { required: t("spaceNameRequired") })}
						error={!!errors.name?.message}
						helperText={errors.name?.message}
					/>
					<TextField
						label={t("space_desc")}
						{...register("space_desc", { required: t("spaceDescRequired") })}
						error={!!errors.name?.message}
						helperText={errors.name?.message}
					/>

					<Button type="submit">{t("create project")}</Button>
				</form>
			</Paper>
		</Modal>
	);
};
