import { ProfileMenu } from '@web/app/features/c/profile-menu/models/profile-menu.model';

export interface PaginationProfileMenu {
  paginationProfileMenu: {
    total?: number;
    per_page?: number;
    current_page?: number;
    from?: number;
    to?: number;
    data?: ProfileMenu[];
  };
}
