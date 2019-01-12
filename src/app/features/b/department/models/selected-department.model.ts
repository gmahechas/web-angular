import { Department } from '@web/app/features/b/department/models/department.model';

export interface SelectedDepartment {
  selectedEntity: Department | null;
}

export const initialStateSelectedDepartment: SelectedDepartment = {
  selectedEntity: null
};
