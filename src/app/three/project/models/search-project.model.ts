import { Macroproject } from '@web/app/three/macroproject/models/macroproject.model';

export interface SearchProject {
  project?: {
    project_id?: string;
    project_name?: string;
  };
  macroproject?: Macroproject | null;
  limit?: number;
  page?: number;
}
