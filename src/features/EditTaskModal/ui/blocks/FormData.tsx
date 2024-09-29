import { useProjectActions } from "@/entities/Project/model/slices/ProjectSlice";
import { useUpdateTaskMutation } from "@/entities/Task/api/taskApi";
import { UserSelect } from "@/entities/User";
import { useAppSelector } from "@/shared/lib/hooks";
import { Button, TextField } from "@mui/material";
import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useTranslation } from "react-i18next";

interface EditTaskFormData {
	title: string;
	description: string;
	image: string;
	executor_id: number;
	createDate: string;
	deadlineDate: string;
}

export const Form = () => {
	const { t } = useTranslation();
	const state = useAppSelector((state) => state.editTask);
	const {
		formState: { errors },
		register,
		getValues,
		setValue,
		handleSubmit,
	} = useForm<EditTaskFormData>();

	const [editTask] = useUpdateTaskMutation();
	const { updateTask } = useProjectActions();
	const store = useAppSelector((state) => state.editTask);

	useEffect(() => {
		setValue("title", state?.task?.title || "");
		setValue("createDate", state?.task?.title || "");
		setValue("deadlineDate", state?.task?.title || "");
		setValue("description", state?.task?.title || "");
		setValue("executor_id", state?.task?.executor.id || 0);
		setValue("image", state?.task?.image[0] || "");
		setValue("title", state?.task?.title || "");
	}, [state]);

	const onSubmit: SubmitHandler<EditTaskFormData> = async ({
		createDate,
		deadlineDate,
		description,
		executor_id,
		image,
		title,
	}) => {
		if (store) {
			const task = await editTask({
				...store?.task,
				title,
				description,
				deadlineDate,
				createDate,
				executor: { id: executor_id, email: "", fullName: "", image, username: "" },
			}).unwrap();
			updateTask({ ...task, space_id: task.spaceId, status_id: task.statusId });
		}
	};

	return (
		<form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
			<TextField
				error={!!errors.title?.message}
				helperText={errors.title?.message}
				label={t("title")}
				{...register("title", { required: t("required") })}
			/>
			<TextField
				error={!!errors.description?.message}
				helperText={errors.description?.message}
				label={t("desc")}
				{...register("description", { required: t("required") })}
			/>
			<div className="grid grid-cols-2 gap-3">
				<TextField
					error={!!errors.createDate?.message}
					helperText={errors.createDate?.message}
					label={t("created date")}
					type="date"
					{...register("createDate", { required: t("required") })}
				/>
				<TextField
					error={!!errors.deadlineDate?.message}
					helperText={errors.deadlineDate?.message}
					label={t("deadline date")}
					type="date"
					{...register("deadlineDate", { required: t("required") })}
				/>
			</div>
			<UserSelect
				id={state?.task?.spaceId || 0}
				type="space"
				value={getValues("executor_id")}
				setValue={(user_id) => setValue("executor_id", user_id)}
			/>

			<Button type="submit">{t("edit")}</Button>
		</form>
	);
};
