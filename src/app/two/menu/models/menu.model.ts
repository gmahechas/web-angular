export interface Menu {
  menu_id?: number;
  menu_name?: string;
  menu_uri?: string;
  menu_created_at?: string;
  menu_updated_at?: string;
  menu_deleted_at?: string;
  menu_id_parent?: number;
  menu_parent?: Menu;
}
