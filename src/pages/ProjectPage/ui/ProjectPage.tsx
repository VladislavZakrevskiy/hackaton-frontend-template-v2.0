import { useGetProjectByIdQuery } from "@/entities/Project";
import { useProjectActions } from "@/entities/Project/model/slices/ProjectSlice";
import { Task } from "@/entities/Task";
import { useAppSelector } from "@/shared/lib/hooks";
import { PageLoader } from "@/widgets/PageLoader";
import { TaskBoard } from "@/widgets/TaskBoard";
import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";

const ProjectPage = () => {
	const { project_id, space_id } = useParams<{ project_id: string; space_id: string }>();
	const { data: projectData, isLoading: isProjectLoading } = useGetProjectByIdQuery(project_id || "");
	const { project } = useAppSelector((state) => state.project);
	const { addProject, setCurrentSpace } = useProjectActions();

	const allTasks: Task[] = useMemo(() => {
		if (project) {
			let res: Task[] = [];
			const space_index = project.spaces.findIndex(({ id }) => id == Number(space_id));
			project.spaces?.[space_index]?.statuses?.forEach(({ tasks }) => {
				res = res.concat(tasks);
			});
			console.log(res);
			return res;
		}
		return [];
	}, [project, space_id]);

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

	return (
		<TaskBoard tasks={allTasks} columns={project.spaces.find(({ id }) => Number(space_id) === id)?.statuses || []} />
	);
};

export default ProjectPage;
