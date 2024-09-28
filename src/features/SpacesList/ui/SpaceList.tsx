import { useProjectActions } from "@/entities/Project/model/slices/ProjectSlice";
import { useCreateSpaceMutation, useGetProjectSpacesQuery } from "@/entities/Space";
import { getRouteSpacePage } from "@/shared/consts/router";
import { useAppSelector } from "@/shared/lib/hooks";
import { Add } from "@mui/icons-material";
import {
	CircularProgress,
	IconButton,
	List,
	ListItem,
	ListSubheader,
	Paper,
	TextField,
	Typography,
	useTheme,
} from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export const SpaceList = () => {
	const [name, setName] = useState<string>("");
	const { project } = useAppSelector((state) => state.project);
	const { isLoading, data } = useGetProjectSpacesQuery({ project_id: project?.id || 1 });
	const { t } = useTranslation();
	const theme = useTheme();
	const [createSpaceDB] = useCreateSpaceMutation();
	const { addSpace } = useProjectActions();

	const createSpace = async () => {
		const space = await createSpaceDB({ description: "", name: name, project_id: project?.id || 0 }).unwrap();
		addSpace({ ...space });
	};

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
			subheader={<ListSubheader className="w-full">{t("spaces")}</ListSubheader>}
			sx={{
				p: 2,
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
			}}
		>
			<ListItem className="flex flex-col justify-center items-center gap-1">
				<TextField value={name} onChange={(e) => setName(e.target.value)} label="Название цеха" />
				<IconButton onClick={createSpace}>
					<Add />
				</IconButton>
			</ListItem>
			{data?.map((space) => (
				<ListItem>
					<Link to={getRouteSpacePage(project?.id || 0, space.id)}>{space.name}</Link>
				</ListItem>
			))}
		</List>
	);
};
