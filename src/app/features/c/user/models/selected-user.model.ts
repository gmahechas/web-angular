import { User } from '@web/app/features/c/user/models/user.model';

export interface SelectedUser {
  selectedEntity?: User | null;
  gotoUserOffice?: boolean;
}

export const initialStateSelectedUser: SelectedUser = {
  selectedEntity: null,
  gotoUserOffice: false
};
