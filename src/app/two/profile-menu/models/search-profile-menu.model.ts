export interface SearchProfileMenu {
  profile_menu?: {
    profile_menu_id?: string;
    profile_menu_status?: string;
  };
  profile?: {
    profile_id?: string;
  };
  menu?: {
    menu_id?: string;
  };
  limit?: number;
  page?: number;
}
