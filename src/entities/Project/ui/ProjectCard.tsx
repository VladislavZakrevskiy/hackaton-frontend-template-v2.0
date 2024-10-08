import { Button, Card, CardActions, CardContent, CardMedia, Paper, Typography, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import { getRandomNumber } from "@/shared/lib/helpers/getRandomNumber";
import { Project } from "../model/types/GetProjectDto";
import { useNavigate } from "react-router-dom";
import { getRouteSpacePage } from "@/shared/consts/router";
import { useDeleteProjectMutation } from "../api/projectApi";
import { Dispatch, SetStateAction } from "react";

interface ProjectProps {
	project: Project;
	setProjects: Dispatch<SetStateAction<Project[]>>;
}

const SpaceMedia = ({ img, name }: { img: string; name: string }) => {
	if (img) {
		return (
			<CardMedia sx={{ height: 140 }} image="/static/images/cards/contemplative-reptile.jpg" title="green iguana" />
		);
	}
	return (
		<Paper
			sx={{
				bgcolor: `rgb(${getRandomNumber(0, 255)}, ${getRandomNumber(0, 255)}, ${getRandomNumber(0, 255)})`,
				height: 140,
				borderRadius: 3,
			}}
			className="flex justify-center items-center"
		>
			{name}
		</Paper>
	);
};

export const ProjectCard = ({ project, setProjects }: ProjectProps) => {
	const { t } = useTranslation();
	const theme = useTheme();
	const nav = useNavigate();
	const [deleteProjectDB] = useDeleteProjectMutation();

	const deleteProject = async () => {
		await deleteProjectDB({ project_id: project.id });
		setProjects((prev) => prev.filter(({ id }) => id !== project.id));
	};

	return (
		<Card sx={{ bgcolor: theme.palette.grey[400], borderRadius: 4, width: "100%" }}>
			<SpaceMedia img={project.image} name={project.name} />
			<CardContent>
				<Typography gutterBottom variant="h5" component="div">
					{project.name}
				</Typography>
				<Typography variant="body2" sx={{ color: "text.secondary" }}>
					{project.description}
				</Typography>
			</CardContent>
			<CardActions>
				<Button onClick={() => nav(getRouteSpacePage(project.id, project.spaces[0].id))} size="small">
					{t("open")}
				</Button>
				<Button onClick={deleteProject} size="small">
					{t("delete")}
				</Button>
			</CardActions>
		</Card>
	);
};
