import { TaskCharts } from "@/entities/Charts";
import { LastTasksList } from "@/features/LastTasksList";
import { ProjectsList } from "@/features/ProjectsList";
import { Paper, useTheme } from "@mui/material";
import { memo } from "react";

const MainPage = memo(() => {
	const theme = useTheme();

	return (
		<Paper className="flex-grow p-3 grid grid-rows-2 grid-cols-2 gap-4" sx={{ bgcolor: theme.palette.grey[400] }}>
			<ProjectsList />
			<LastTasksList />
			<div className="col-span-2 w-full p-2">
				<TaskCharts />
			</div>
		</Paper>
	);
});

export default MainPage;
