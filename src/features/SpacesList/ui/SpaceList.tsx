import { useProjectActions } from "@/entities/Project/model/slices/ProjectSlice";
import { useCreateSpaceMutation, useDeleteSpaceMutation, useGetProjectSpacesQuery } from "@/entities/Space";
import { getRouteSpacePage } from "@/shared/consts/router";
import { useAppSelector } from "@/shared/lib/hooks";
import { Add, Delete } from "@mui/icons-material";
import {
	Button,
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
	const { setCurrentSpace } = useProjectActions();
	const { project } = useAppSelector((state) => state.project);
	const { isLoading, data } = useGetProjectSpacesQuery({ project_id: project?.id || 1 });
	const { t } = useTranslation();
	const theme = useTheme();
	const [createSpaceDB] = useCreateSpaceMutation();
	const [deleteSpaceDB] = useDeleteSpaceMutation();

	const { addSpace, removeSpace } = useProjectActions();

	const createSpace = async () => {
		const space = await createSpaceDB({ description: "", name: name, project_id: project?.id || 0 }).unwrap();
		addSpace({ ...space });
	};

	const deleteSpace = async (space_id: number) => {
		await deleteSpaceDB({ space_id });
		removeSpace({ space_id });
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
				<Button color="inherit" variant="text" startIcon={<Add />} onClick={createSpace}>
					{t("add")}
				</Button>
			</ListItem>
			<div className="flex flex-col justify-center items-center">
				{data?.map((space) => (
					<ListItem key={space.id} className="flex justify-center items-center gap-2">
						<Link onClick={() => setCurrentSpace(space)} to={getRouteSpacePage(project?.id || 0, space.id)}>
							{space.name}
						</Link>
						<IconButton onClick={() => deleteSpace(space.id)}>
							<Delete />
						</IconButton>
					</ListItem>
				))}
			</div>
		</List>
	);
};
