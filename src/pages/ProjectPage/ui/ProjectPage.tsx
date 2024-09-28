import { useGetProjectByIdQuery } from "@/entities/Project";
import { useProjectActions } from "@/entities/Project/model/slices/ProjectSlice";
import { Status } from "@/entities/Status";
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
	const { addProject, setCurrentSpace } = useProjectActions();

	const allTasks: Task[] = useMemo(() => {
		if (project) {
			const res: Task[] = [];
			current_space?.statuses.forEach(({ tasks }) => res.concat(tasks));
			return res;
		}
		return [];
	}, [project, current_space]);

	const allColumns: Status[] = useMemo(() => {
		return current_space?.statuses || [];
	}, [current_space]);

	useEffect(() => {
		if (projectData) {
			addProject(projectData);
			setCurrentSpace(projectData.spaces?.[0]);
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
