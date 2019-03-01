import { Macroproject } from '@web/app/features/d/macroproject/models/macroproject.model';
import { Office } from '@web/app/features/b/office/models/office.model';

export interface SearchProject {
  project?: {
    project_id?: string;
    project_name?: string;
  };
  macroproject?: Macroproject | null;
  office?: Office | null;
  limit?: number;
  page?: number;
}
