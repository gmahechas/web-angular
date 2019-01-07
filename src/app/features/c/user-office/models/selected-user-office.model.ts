import { UserOffice } from '@web/app/features/c/user-office/models/user-office.model';

export interface SelectedUserOffice {
  selectedEntity: UserOffice | null;
  gotoUserOfficeProject: boolean;
}

export const initialStateSelectedUserOffice: SelectedUserOffice = {
  selectedEntity: null,
  gotoUserOfficeProject: false
};
