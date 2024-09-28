import { useGetProjectSpacesQuery } from "@/entities/Space";
import { getRouteSpacePage } from "@/shared/consts/router";
import { useAppSelector } from "@/shared/lib/hooks";
import { CircularProgress, List, ListItem, ListSubheader, Paper, Typography, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export const SpaceList = () => {
	const { project } = useAppSelector((state) => state.project);
	const { isLoading, data } = useGetProjectSpacesQuery({ project_id: project?.id || 1 });
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
		<List
			subheader={<ListSubheader>{t("spaces")}</ListSubheader>}
			sx={{
				p: 2,
				width: "100%",
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
				boxShadow: `3px 3px 0 2px ${theme.palette.text.primary}`,
			}}
		>
			{data?.map((space) => (
				<ListItem>
					<Link to={getRouteSpacePage(project?.id || 0, space.id)}>{space.name}</Link>
				</ListItem>
			))}
		</List>
	);
};
