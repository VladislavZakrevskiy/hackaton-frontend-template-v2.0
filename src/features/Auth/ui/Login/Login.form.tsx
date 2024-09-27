import React, { useState, ChangeEvent, FormEvent } from "react";
import { TextField, Button, Typography, Paper } from "@mui/material";
import { useTranslation } from "react-i18next";

interface LoginFormData {
	username: string;
	password: string;
}

export const LoginForm: React.FC = () => {
	const { t } = useTranslation();

	const [formData, setFormData] = useState<LoginFormData>({
		username: "",
		password: "",
	});

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
	};

	return (
		<Paper
			onSubmit={handleSubmit}
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

			<Button variant="contained" color="primary" type="submit" size="large" fullWidth>
				{t("submit")}
			</Button>
		</Paper>
	);
};
