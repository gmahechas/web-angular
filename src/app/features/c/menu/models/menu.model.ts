export interface Menu {
  menu_id?: number;
  menu_name?: string;
  menu_title_case?: boolean;
  menu_upper_case?: boolean;
  menu_uri?: string;
  menu_parent_id?: number;
  menu_parent?: Menu | null;
  menu_created_at?: string;
  menu_updated_at?: string;
  menu_deleted_at?: string;
}
