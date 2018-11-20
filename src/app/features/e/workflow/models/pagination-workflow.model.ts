import { Workflow } from '@web/app/features/e/workflow/models/workflow.model';

export interface PaginationWorkflow {
  paginationWorkflow: {
    total?: number;
    per_page?: number;
    current_page?: number;
    from?: number;
    to?: number;
    data?: Workflow[];
};
}
