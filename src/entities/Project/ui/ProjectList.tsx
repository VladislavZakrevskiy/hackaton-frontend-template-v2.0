import { FC } from "react";
import { Project } from "../model/types/GetProjectDto";
import { ProjectCard } from "./ProjectCard";

interface ProjectListProps {
	projects: Project[];
}

export const ProjectList: FC<ProjectListProps> = ({ projects }) => {
	return (
		<div className="flex flex-wrap justify-start items-center">
			{projects.map((project) => (
				<ProjectCard project={project} key={project.id} />
			))}
		</div>
	);
};
