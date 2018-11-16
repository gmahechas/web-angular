import { Macroproject } from '@web/app/features/d/macroproject/models/macroproject.model';

export interface PaginationMacroproject {
  paginationMacroproject: {
    total?: number;
    per_page?: number;
    current_page?: number;
    from?: number;
    to?: number;
    data?: Macroproject[];
};
}
