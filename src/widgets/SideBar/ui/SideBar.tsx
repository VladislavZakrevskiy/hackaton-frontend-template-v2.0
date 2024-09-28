import React from "react";
import { Drawer, Toolbar, Typography, Divider, useTheme } from "@mui/material";
import { useAppSelector } from "@/shared/lib/hooks";
import { useSidebarActions } from "../model/SidebarSlice";
import { useTranslation } from "react-i18next";

export const Sidebar: React.FC = () => {
	const { isOpen } = useAppSelector((state) => state.sidebar);
	const { setIsOpen } = useSidebarActions();
	const { t } = useTranslation();
	const theme = useTheme();

	return (
		<Drawer open={isOpen} onClose={() => setIsOpen(false)} anchor="left">
			<Toolbar />

			<Divider sx={{ backgroundColor: theme.palette.text.primary, marginY: "10px" }} />

			<div className="flex justify-center items-center flex-col gap-1 pt-3">
				<Typography align="center" sx={{ color: theme.palette.text.secondary, fontStyle: "italic" }}>
					{t("pytivetka")}
				</Typography>
				<Typography align="center" sx={{ color: theme.palette.text.secondary, fontStyle: "italic" }}>
					{t("for front")}
				</Typography>
			</div>
		</Drawer>
	);
};
