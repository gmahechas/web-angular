import { Context } from '@web/app/features/e/context/models/context.model';

export interface PaginationContext {
  paginationContext: {
    total?: number;
    per_page?: number;
    current_page?: number;
    from?: number;
    to?: number;
    data?: Context[];
};
}
