import { OfficeDepartment } from '@web/app/features/b/office-department/models/office-department.model';

export interface PaginationOfficeDepartment {
  paginationOfficeDepartment: {
    total?: number;
    per_page?: number;
    current_page?: number;
    from?: number;
    to?: number;
    data?: OfficeDepartment[];
};
}
