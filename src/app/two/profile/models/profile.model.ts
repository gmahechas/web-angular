import { ProfileMenu } from '@web/app/two/profile-menu/models/profile-menu.model';

export interface Profile {
  profile_id?: number;
  profile_name?: string;
  profile_created_at?: string;
  profile_updated_at?: string;
  profile_deleted_at?: string;
  profile_menus?: ProfileMenu[];
}
