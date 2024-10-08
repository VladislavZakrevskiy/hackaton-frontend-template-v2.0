import { Modals } from "@/app/managers";
import { useModalManagerActions } from "@/app/managers/ModalManager/ModalManager";
import { useCreateProjectMutation } from "@/entities/Project";
import { useProjectActions } from "@/entities/Project/model/slices/ProjectSlice";
import { useAddUserToSpaceMutation, useCreateSpaceMutation } from "@/entities/Space";
import { getRouteSpacePage } from "@/shared/consts/router";
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
	const { authData } = useAppSelector((state) => state.user);
	const { setIsOpen } = useModalManagerActions();
	const { t } = useTranslation();
	const [createProject, { isSuccess, data }] = useCreateProjectMutation();
	const [createSpace, { data: space }] = useCreateSpaceMutation();
	const [addUserToSpace] = useAddUserToSpaceMutation();
	const { setCurrentSpace } = useProjectActions();
	const nav = useNavigate();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<AddProjectFormData>();

	const onSubmit: SubmitHandler<AddProjectFormData> = async (data) => {
		const { id } = await createProject({ name: data.name }).unwrap();
		const { id: space_id, ...space } = await createSpace({
			project_id: id,
			description: data.space_desc,
			name: data.space_name,
		}).unwrap();
		await addUserToSpace({ project_id: id, space_id: space_id, usernameToBeAdded: authData?.id || 0 });
		setIsOpen({ isOpen: false, modal: currentModal || Modals.CREATE_PROJECT });
		setCurrentSpace({ ...space, id: space_id });
	};

	useEffect(() => {
		if (isSuccess) {
			nav(getRouteSpacePage(data.id, space?.id || 0));
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
