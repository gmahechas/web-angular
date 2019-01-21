import { Context } from '@web/app/features/e/context/models/context.model';

export interface SearchContextVar {
  context_var?: {
    context_var_id?: string;
    context_var_code?: string;
    context_var_type?: string;
    context_var_description?: string;
  };
  context?: Context | null;
  limit?: number;
  page?: number;
}
