import { Department } from '@web/app/features/b/department/models/department.model';

export interface PaginationDepartment {
  paginationDepartment: {
    total?: number;
    per_page?: number;
    current_page?: number;
    from?: number;
    to?: number;
    data?: Department[];
};
}
