import { getRouteMain } from "@/shared/consts/router";
import { Button, Container, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export const ErrorCard = () => {
	const { t } = useTranslation("");
	const nav = useNavigate();
	return (
		<Container sx={{ bgcolor: "red" }}>
			<Typography>{t("error")}</Typography>
			<Typography>{t("sorry")}</Typography>
			<Button onClick={() => nav(getRouteMain())}>{t("to main page")}</Button>
		</Container>
	);
};
