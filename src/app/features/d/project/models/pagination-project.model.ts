import { Project } from '@web/app/features/d/project/models/project.model';

export interface PaginationProject {
  paginationProject: {
    total?: number;
    per_page?: number;
    current_page?: number;
    from?: number;
    to?: number;
    data?: Project[];
};
}
