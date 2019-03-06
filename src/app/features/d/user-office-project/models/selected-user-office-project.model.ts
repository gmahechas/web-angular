import { UserOfficeProject } from '@web/app/features/d/user-office-project/models/user-office-project.model';

export interface SelectedUserOfficeProject {
  selectedEntity?: UserOfficeProject | null;
}

export const initialStateSelectedUserOfficeProject: SelectedUserOfficeProject = {
  selectedEntity: null
};
