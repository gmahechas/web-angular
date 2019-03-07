import { ProfileMenu } from '@web/app/features/c/profile-menu/models';

export interface SelectedMenus {
  selected?: ProfileMenu | null;
  profileMenus?: ProfileMenu[];
}

export const initialStateSelectedMenus: SelectedMenus = {
  selected: null,
  profileMenus: []
};
