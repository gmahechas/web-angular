import { Menu } from '@web/app/features/c/menu/models/menu.model';

export interface SearchContext {
  context?: {
    context_id?: string;
    context_description?: string;
  };
  menu: Menu | null;
  limit?: number;
  page?: number;
}
