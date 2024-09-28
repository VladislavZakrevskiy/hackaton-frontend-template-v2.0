import { useGetProjectsQuery } from "@/entities/Project";
import { ProjectCard } from "@/entities/Project/ui/ProjectCard";
import { getRouteProjectPage } from "@/shared/consts/router";
import { CircularProgress, List, ListSubheader, Paper, Typography, useTheme } from "@mui/material";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

interface ProjectsListProps {
	isShort?: boolean;
}

export const ProjectsList: FC<ProjectsListProps> = ({ isShort }) => {
	const { isLoading, data } = useGetProjectsQuery();
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

	if (!data || data?.length === 0) {
		return (
			<Paper
				sx={{
					p: 2,
					boxShadow: `3px 3px 0 2px ${theme.palette.text.primary}`,
				}}
			>
				<Typography color={theme.palette.text.primary} variant={"h6"}>
					{t("no projects")}
				</Typography>
			</Paper>
		);
	}

	if (isShort) {
		return (
			<List
				className="flex flex-col gap-1 items-center"
				subheader={
					<ListSubheader className="w-full" component={"div"}>
						{t("projects")}
					</ListSubheader>
				}
			>
				{data.map((project) => (
					<Link key={project.id} to={getRouteProjectPage(project.id)}>
						{project.name}
					</Link>
				))}
			</List>
		);
	}

	return (
		<Paper
			sx={{
				p: 2,
				boxShadow: `3px 3px 0 2px ${theme.palette.text.primary}`,
				gap: 3,
				width: "100%",
			}}
		>
			<Typography variant="h6">{t("projects")}</Typography>
			<div
				style={{
					display: "flex",
					flexWrap: "wrap",
					gap: 10,
					width: "100%",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				{data.map((project) => (
					<ProjectCard key={project.id} project={project} />
				))}
			</div>
		</Paper>
	);
};
