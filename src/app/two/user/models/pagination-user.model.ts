import { User } from '@web/app/two/user/models/user.model';

export interface PaginationUser {
  paginationUser: {
    total?: number;
    per_page?: number;
    current_page?: number;
    from?: number;
    to?: number;
    data?: User[];
};
}
