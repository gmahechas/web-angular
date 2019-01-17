import { OfficeDepartment } from '@web/app/features/b/office-department/models/office-department.model';

export interface SelectedOfficeDepartment {
  selectedEntity: OfficeDepartment | null;
}

export const initialStateSelectedOfficeDepartment: SelectedOfficeDepartment = {
  selectedEntity: null
};
