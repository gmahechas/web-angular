import { UserOfficeProject } from '@web/app/features/d/user-office-project/models/user-office-project.model';

export interface PaginationUserOfficeProject {
  paginationUserOfficeProject: {
    total?: number;
    per_page?: number;
    current_page?: number;
    from?: number;
    to?: number;
    data?: UserOfficeProject[];
};
}
