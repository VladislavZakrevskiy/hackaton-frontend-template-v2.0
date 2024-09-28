import React from "react";
import { AppBar, Toolbar, IconButton, Typography, Button } from "@mui/material";
import { Add, Notifications, AccountCircle } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import { ThemeSwitcher } from "@/features/ThemeSwitcher";
import { LanguageSwitcher } from "@/features/LanguageSwitcher";
import { Modals, useModalManagerActions } from "@/app/managers";

export const Navbar: React.FC = () => {
	const theme = useTheme();
	const { t } = useTranslation();
	const { setIsOpen } = useModalManagerActions();

	return (
		<AppBar position="static" sx={{ backgroundColor: theme.palette.primary.main }}>
			<Toolbar sx={{ backgroundColor: theme.palette.primary.main }}>
				<Typography variant="h6" sx={{ flexGrow: 1 }}>
					{t("sovet proj")}
				</Typography>

				<div className="flex items-center justify-around gap-2">
					<Button
						onClick={() => setIsOpen({ isOpen: true, modal: Modals.CREATE_PROJECT })}
						startIcon={<Add />}
						sx={{ color: theme.palette.text.primary }}
					>
						{t("new proj")}
					</Button>

					<IconButton>
						<Notifications />
					</IconButton>

					<IconButton>
						<AccountCircle />
					</IconButton>

					<ThemeSwitcher />
					<LanguageSwitcher />
				</div>
			</Toolbar>
		</AppBar>
	);
};
