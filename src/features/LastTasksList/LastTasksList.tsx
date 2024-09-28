import { useGetMyTasksQuery } from "@/entities/Task/api/taskApi";
import { getRouteTaskPage } from "@/shared/consts/router";
import { CircularProgress, List, ListItem, ListSubheader } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export const LastTasksList = () => {
	const { t } = useTranslation();
	const { data, isLoading } = useGetMyTasksQuery();

	if (isLoading) {
		return (
			<List subheader={<ListSubheader component={"h6"}>{t("last tasks")}</ListSubheader>}>
				<CircularProgress size={30} />
			</List>
		);
	}

	return (
		<List subheader={<ListSubheader component={"h6"}>{t("last tasks")}</ListSubheader>}>
			{!data || data?.length === 0 ? (
				<ListItem>{t("no tasks")}</ListItem>
			) : (
				data?.map((task) => (
					<ListItem>
						<Link to={getRouteTaskPage(task.id)}>
							{task.title} {`[${task.status}]`}
						</Link>
					</ListItem>
				))
			)}
		</List>
	);
};
