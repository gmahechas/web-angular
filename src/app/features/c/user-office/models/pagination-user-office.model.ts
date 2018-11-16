import { UserOffice } from '@web/app/features/c/user-office/models/user-office.model';

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
