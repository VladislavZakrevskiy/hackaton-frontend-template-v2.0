import React, { useState, ChangeEvent, FormEvent } from "react";
import { TextField, Button, Typography, Paper, CircularProgress } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useLazyGetMeQuery, useSignInMutation, useUserActions } from "@/entities/User";
import { getRouteMain } from "@/shared/consts/router";
import { useNavigate } from "react-router-dom";
import { USER_ACCESS_TOKEN, USER_REFRESH_TOKEN } from "@/shared/consts/localStorage";

interface LoginFormData {
	username: string;
	password: string;
}

export const LoginForm: React.FC = () => {
	const { t } = useTranslation();
	const [signIn, { isLoading }] = useSignInMutation();
	const [getMe] = useLazyGetMeQuery();
	const [formData, setFormData] = useState<LoginFormData>({
		username: "",
		password: "",
	});
	const { setAuthData } = useUserActions();
	const nav = useNavigate();

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		if (formData.password && formData.username) {
			const { accessToken, refreshToken } = await signIn(formData).unwrap();
			localStorage.setItem(USER_ACCESS_TOKEN, accessToken);
			localStorage.setItem(USER_REFRESH_TOKEN, refreshToken);
			console.log(accessToken, refreshToken);

			const { data } = await getMe();
			if (data) {
				nav(getRouteMain());
				console.log(data);
				setAuthData(data);
			}
		}
	};

	return (
		<Paper
			sx={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				mt: 4,
				p: 3,
				border: "7px solid",
				borderColor: "primary.main",
				gap: 1,
			}}
		>
			<Typography variant="h4" gutterBottom>
				{t("login_page")}
			</Typography>

			<TextField
				label={t("username")}
				name="username"
				value={formData.username}
				onChange={handleChange}
				required
				fullWidth
				sx={{ mb: 2 }}
			/>

			<TextField
				label={t("password")}
				name="password"
				type="password"
				value={formData.password}
				onChange={handleChange}
				required
				fullWidth
				sx={{ mb: 2 }}
			/>

			<Button onClick={handleSubmit} variant="contained" color="primary" type="submit" size="large" fullWidth>
				{isLoading ? <CircularProgress size={20} color="secondary" /> : t("submit")}
			</Button>
		</Paper>
	);
};
