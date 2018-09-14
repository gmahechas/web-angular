import { Project } from './project.model';

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
