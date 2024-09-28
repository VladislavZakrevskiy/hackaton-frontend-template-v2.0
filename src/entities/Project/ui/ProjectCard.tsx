import { Button, Card, CardActions, CardContent, CardMedia, Paper, Typography, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import { getRandomNumber } from "@/shared/lib/helpers/getRandomNumber";
import { Project } from "../model/types/GetProjectDto";
import { useNavigate } from "react-router-dom";
import { getRouteProjectPage } from "@/shared/consts/router";

interface ProjectProps {
	project: Project;
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

export const ProjectCard = ({ project }: ProjectProps) => {
	const { t } = useTranslation();
	const theme = useTheme();
	const nav = useNavigate();

	return (
		<Card sx={{ bgcolor: theme.palette.grey[400], borderRadius: 4, width: "30%" }}>
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
				<Button onClick={() => nav(getRouteProjectPage(project.id))} size="small">
					{t("open")}
				</Button>
				<Button size="small">{t("delete")}</Button>
			</CardActions>
		</Card>
	);
};
