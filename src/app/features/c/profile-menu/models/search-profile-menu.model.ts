import { Profile } from '@web/app/features/c/profile/models/profile.model';
import { Menu } from '@web/app/features/c/menu/models/menu.model';

export interface SearchProfileMenu {
  profile_menu?: {
    profile_menu_id?: string;
    profile_menu_status?: boolean | null;
  };
  profile?: Profile | null;
  menu?: Menu | null;
  limit?: number;
  page?: number;
}
