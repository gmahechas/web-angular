import { UserOffice } from '@web/app/two/user-office/models/user-office.model';

export interface PaginationUserOffice {
  paginationUserOffice: {
    total?: number;
    per_page?: number;
    current_page?: number;
    from?: number;
    to?: number;
    data?: UserOffice[];
  };
}
