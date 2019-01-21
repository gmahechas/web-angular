import { ContextVar } from '@web/app/features/e/context-var/models/context-var.model';

export interface PaginationContextVar {
  paginationContextVar: {
    total?: number;
    per_page?: number;
    current_page?: number;
    from?: number;
    to?: number;
    data?: ContextVar[];
};
}
