import React, { useState } from "react";
import { Box, useTheme } from "@mui/material";
import { ChevronRight, ChevronLeft } from "@mui/icons-material";
import { SpaceList } from "@/features/SpacesList";
import { ProjectsList } from "@/features/ProjectsList";

export const Sidebar: React.FC = () => {
	const theme = useTheme();
	const [isOpen, setIsOpen] = useState(true);

	const toggleSidebar = () => {
		setIsOpen((prev) => !prev);
	};

	return (
		<Box
			sx={{
				width: isOpen ? 240 : 20,
				minWidth: isOpen ? 240 : 20,
				minHeight: "100vh",
				transition: "width 0.3s ease",
				overflow: "visible",
				backgroundColor: theme.palette.primary.main,
				position: "relative",
			}}
		>
			{isOpen && (
				<Box component={"div"} className="flex flex-col items-center gap-5" sx={{ padding: "20px" }}>
					<ProjectsList isShort />
					<SpaceList />
				</Box>
			)}

			<Box
				sx={{
					position: "absolute",
					top: "60vh",
					bottom: "auto",
					left: isOpen ? "200px" : "-5px",
					width: "60px",
					transition: "left 0.3s ease",
					height: "60px",
					cursor: "pointer",
					borderRadius: 9999,
					backgroundColor: theme.palette.primary.main,
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					color: "white",
				}}
				onClick={toggleSidebar}
			>
				{isOpen ? <ChevronLeft /> : <ChevronRight />}
			</Box>
		</Box>
	);
};
