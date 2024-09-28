import { useGetProjectSpacesQuery } from "@/entities/Space";
import { getRouteSpacePage } from "@/shared/consts/router";
import { CircularProgress, ListItem, Paper, Typography, useTheme } from "@mui/material";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export interface SpaceListProps {
	project_id: number;
}

export const SpaceList: FC<SpaceListProps> = ({ project_id }) => {
	const { isLoading, data } = useGetProjectSpacesQuery({ project_id });
	const { t } = useTranslation();
	const theme = useTheme();

	if (isLoading) {
		return (
			<Paper
				sx={{
					p: 2,
					width: "100%",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					boxShadow: `3px 3px 0 2px ${theme.palette.text.primary}`,
				}}
			>
				<CircularProgress size={30} />
			</Paper>
		);
	}

	if (!data || data.length === 0) {
		return (
			<Paper
				sx={{
					p: 2,
					boxShadow: `3px 3px 0 2px ${theme.palette.text.primary}`,
				}}
			>
				<Typography color={theme.palette.text.primary} variant={"h6"}>
					{t("no spaces")}
				</Typography>
			</Paper>
		);
	}

	return (
		<Paper
			sx={{
				p: 2,
				width: "100%",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				boxShadow: `3px 3px 0 2px ${theme.palette.text.primary}`,
			}}
		>
			<Typography variant="h6">{t("spaces")}</Typography>
			{data?.map((space) => (
				<ListItem>
					<Link to={getRouteSpacePage(space.id)}>{space.name}</Link>
				</ListItem>
			))}
		</Paper>
	);
};
