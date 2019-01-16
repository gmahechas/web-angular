import { Profile } from '@web/app/features/c/profile/models/profile.model';
import { Menu } from '@web/app/features/c/menu/models/menu.model';

export interface ProfileMenu {
  profile_menu_id?: number;
  profile_menu_status?: boolean;
  profile_id?: number;
  profile?: Profile;
  menu_id?: number;
  menu?: Menu;
  profile_menu_created_at?: string;
  profile_menu_updated_at?: string;
  profile_menu_deleted_at?: string;
}
