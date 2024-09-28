import { Button, useTheme } from "@mui/material";
import { memo, type FC } from "react";
import { useTranslation } from "react-i18next";

export const LanguageSwitcher: FC = memo(() => {
	const { i18n } = useTranslation();
	const theme = useTheme();

	const toggle = async () => {
		i18n.changeLanguage(i18n.language === "ru" ? "en" : "ru");
	};

	return (
		<Button sx={{ color: theme.palette.text.primary }} onClick={toggle}>
			{i18n.language}
		</Button>
	);
});
