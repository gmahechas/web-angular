import { UserOffice } from '@web/app/features/c/user-office/models/user-office.model';

export interface SelectedUserOffice {
  selectedEntity: UserOffice | null;
}

export const initialStateSelectedUserOffice: SelectedUserOffice = {
  selectedEntity: null
};
