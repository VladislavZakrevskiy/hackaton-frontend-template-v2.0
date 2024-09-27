import { Button, Card, CardActions, CardContent, CardMedia, Paper, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Space } from "../model/types/GetSpaceDto";
import { getRandomNumber } from "@/shared/lib/helpers/getRandomNumber";

interface SpaceProps {
	space: Space;
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
		>
			{name}
		</Paper>
	);
};

export const SpaceCard = ({ space }: SpaceProps) => {
	const { t } = useTranslation();

	return (
		<Card>
			<SpaceMedia img={space.image} name={space.name} />
			<CardContent>
				<Typography gutterBottom variant="h5" component="div">
					{space.name}
				</Typography>
				<Typography variant="body2" sx={{ color: "text.secondary" }}>
					{space.description}
				</Typography>
			</CardContent>
			<CardActions>
				<Button size="small">{t("open")}</Button>
				<Button size="small">{t("delete")}</Button>
			</CardActions>
		</Card>
	);
};
