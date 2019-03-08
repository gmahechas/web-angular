import { ProfileMenu } from '@web/app/features/c/profile-menu/models';

export interface SelectedMenus {
  selected?: ProfileMenu | null;
  profileMenus?: ProfileMenu[];
}

export const initialProfileMenu: ProfileMenu = {
  menu_id: 1,
  menu: {
    menu_id: 1,
    menu_name: 'dashboard.singular',
    menu_title_case: true,
    menu_upper_case: false,
    menu_uri: 'dashboard',
    menu_parent_id: null
  }
};

export const initialStateSelectedMenus: SelectedMenus = {
  selected: initialProfileMenu,
  profileMenus: [initialProfileMenu]
};
