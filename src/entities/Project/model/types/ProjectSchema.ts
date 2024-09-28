import { Space } from "@/entities/Space";
import { Project } from "./GetProjectDto";

export interface ProjectSchema {
	project: Project | null;
	current_space: Space | null
}
