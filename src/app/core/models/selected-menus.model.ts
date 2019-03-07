import { Menu } from '@web/app/features/c/menu/models/menu.model';

export interface SelectedMenus {
  selected?: Menu | null;
  menus?: Menu[];
}

export const initialStateSelectedMenus: SelectedMenus = {
  selected: null,
  menus: []
};
