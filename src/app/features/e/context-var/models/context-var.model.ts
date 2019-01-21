import { Context } from '@web/app/features/e/context/models/context.model';

export interface ContextVar {
  context_var_id?: number;
  context_var_code?: string;
  context_var_type?: string;
  context_var_description?: string;
  context_var_order?: string;
  context_id?: number;
  context?: Context;
  context_var_created_at?: string;
  context_var_updated_at?: string;
  context_var_deleted_at?: string;
}
