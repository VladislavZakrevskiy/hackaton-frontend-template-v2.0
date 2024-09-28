import { useGetProjectByIdQuery } from "@/entities/Project";
import { useProjectActions } from "@/entities/Project/model/slices/ProjectSlice";
import { Space } from "@/entities/Space";
import { Task } from "@/entities/Task";
import { useAppSelector } from "@/shared/lib/hooks";
import { PageLoader } from "@/widgets/PageLoader";
import { TaskBoard } from "@/widgets/TaskBoard";
import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";

const ProjectPage = () => {
	const { id } = useParams<{ id: string }>();
	const { data: projectData, isLoading: isProjectLoading } = useGetProjectByIdQuery(id || "");
	const { project, current_space } = useAppSelector((state) => state.project);
	const { addProject } = useProjectActions();

	const allTasks: Task[] = useMemo(() => {
		if (project) {
			const res: Task[] = [];
			for (const spaces of project.spaces) {
				spaces.statuses.forEach(({ tasks }) => res.concat(tasks));
			}
			return res;
		}
		return [];
	}, [project?.spaces]);

	const allColumns: (Space & { tasks: Task[] })[] = useMemo(() => {
		if (project) {
			const columns: (Space & { tasks: Task[] })[] = [];
			for (const space of project.spaces) {
				const space_tasks: Task[] = [];
				space.statuses.forEach(({ tasks }) => space_tasks.concat(tasks));
				columns.push({ ...space, tasks: space_tasks });
			}
			return columns;
		}
		return [];
	}, [project?.spaces]);

	useEffect(() => {
		if (projectData) {
			addProject(projectData);
		}
	}, [projectData]);

	if (isProjectLoading) {
		return <PageLoader />;
	}

	if (!project) {
		return null;
	}

	return <TaskBoard tasks={allTasks} columns={allColumns} />;
};

export default ProjectPage;
