import { Project } from '@web/app/features/d/project/models/project.model';

export interface SelectedProject {
  selectedEntity: Project | null;
}

export const initialStateSelectedProject: SelectedProject = {
  selectedEntity: null
};
