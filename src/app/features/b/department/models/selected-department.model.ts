import { Department } from '@web/app/features/b/department/models/department.model';

export interface SelectedDepartment {
  selectedEntity?: Department | null;
  gotoOfficeDepartment?: boolean | null;
}

export const initialStateSelectedDepartment: SelectedDepartment = {
  selectedEntity: null,
  gotoOfficeDepartment: false
};
