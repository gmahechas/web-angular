import { UserOffice } from '@web/app/features/c/user-office/models/user-office.model';
import { Project } from '@web/app/features/d/project/models/project.model';

export interface UserOfficeProject {
  user_office_project_id?: number;
  user_office_project_status?: boolean;
  user_office_id?: number;
  user_office?: UserOffice;
  project_id?: number;
  project?: Project;
  user_office_project_created_at?: string;
  user_office_project_updated_at?: string;
  user_office_project_deleted_at?: string;
}
