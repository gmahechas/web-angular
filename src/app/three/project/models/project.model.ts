import { Macroproject } from '../../macroproject/models';

export interface Project {
  project_id?: number;
  project_name?: string;
  project_address?: string;
  project_phone?: string;
  project_created_at?: string;
  project_updated_at?: string;
  project_deleted_at?: string;
  macroproject_id?: string;
  macroproject?: Macroproject;
}
