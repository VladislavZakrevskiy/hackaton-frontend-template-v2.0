import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { TextField, Button, Typography, Paper, CircularProgress } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useRegisterMutation } from "@/entities/User";
import { useNavigate } from "react-router-dom";
import { getRouteLogin } from "@/shared/consts/router";

interface RegisterFormData {
	fullName: string;
	username: string;
	email: string;
	password: string;
	confirmPassword: string;
}

export const RegisterForm: React.FC = () => {
	const { t } = useTranslation();
	const [registerUser, { isSuccess, isLoading }] = useRegisterMutation();
	const nav = useNavigate();

	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
	} = useForm<RegisterFormData>();

	const onSubmit: SubmitHandler<RegisterFormData> = async (data) => {
		await registerUser({
			email: data.email,
			fullName: data.fullName,
			password: data.password,
			username: data.username,
		});
	};

	useEffect(() => {
		if (isSuccess) {
			nav(getRouteLogin());
		}
	}, [isSuccess]);

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
				error={!!errors.fullName}
				helperText={errors.fullName?.message}
				fullWidth
				sx={{ mb: 2 }}
			/>

			<TextField
				label={t("fullName")}
				{...register("fullName", { required: t("fullNameRequired") })}
				error={!!errors.fullName}
				helperText={errors.fullName?.message}
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
				{isLoading ? <CircularProgress size={20} color="secondary" /> : t("submit")}
			</Button>
		</Paper>
	);
};
