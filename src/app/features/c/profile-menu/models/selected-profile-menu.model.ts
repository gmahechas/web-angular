import { ProfileMenu } from '@web/app/features/c/profile-menu/models/profile-menu.model';

export interface SelectedProfileMenu {
  selectedEntity: ProfileMenu | null;
}

export const initialStateSelectedProfileMenu: SelectedProfileMenu = {
  selectedEntity: null
};
