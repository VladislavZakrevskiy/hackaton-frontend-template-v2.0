import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { TextField, Button, Typography, Paper } from "@mui/material";
import { useTranslation } from "react-i18next";

interface RegisterFormData {
	username: string;
	email: string;
	password: string;
	confirmPassword: string;
}

export const RegisterForm: React.FC = () => {
	const { t } = useTranslation();

	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
	} = useForm<RegisterFormData>();

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const onSubmit: SubmitHandler<RegisterFormData> = (data) => {};

	const password = watch("password");

	return (
		<Paper
			component="form"
			onSubmit={handleSubmit(onSubmit)}
			sx={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				mt: 4,
				p: 3,
				border: "7px solid",
				borderColor: "primary.main",
			}}
		>
			<Typography variant="h4" gutterBottom>
				{t("register")}
			</Typography>

			<TextField
				label={t("username")}
				{...register("username", { required: t("usernameRequired") })}
				error={!!errors.username}
				helperText={errors.username?.message}
				fullWidth
				sx={{ mb: 2 }}
			/>

			<TextField
				label={t("email")}
				type="email"
				{...register("email", {
					required: t("emailRequired"),
					pattern: {
						value: /^\S+@\S+$/i,
						message: t("emailInvalid"),
					},
				})}
				error={!!errors.email}
				helperText={errors.email?.message}
				fullWidth
				sx={{ mb: 2 }}
			/>

			<TextField
				label={t("password")}
				type="password"
				{...register("password", { required: t("passwordRequired") })}
				error={!!errors.password}
				helperText={errors.password?.message}
				fullWidth
				sx={{ mb: 2 }}
			/>

			<TextField
				label={t("confirmPassword")}
				type="password"
				{...register("confirmPassword", {
					required: t("confirmPasswordRequired"),
					validate: (value) => value === password || t("passwordsDoNotMatch"),
				})}
				error={!!errors.confirmPassword}
				helperText={errors.confirmPassword?.message}
				fullWidth
				sx={{ mb: 2 }}
			/>

			<Button variant="contained" color="primary" type="submit" size="large" fullWidth>
				{t("submit")}
			</Button>
		</Paper>
	);
};
