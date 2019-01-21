import { Menu } from '@web/app/features/c/menu/models/menu.model';

export interface Context {
  context_id?: number;
  context_description?: string;
  menu_id?: number;
  menu?: Menu;
  context_created_at?: string;
  context_updated_at?: string;
  context_deleted_at?: string;
}
