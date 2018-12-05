import { UserOffice } from '@web/app/features/c/user-office/models/user-office.model';
import { Project } from '@web/app/features/d/project/models/project.model';

export interface SearchUserOfficeProject {
  user_office_project?: {
    user_office_project_id?: string;
    user_office_project_status?: string;
  };
  user_office?: UserOffice | null;
  project?: Project | null;
  limit?: number;
  page?: number;
}
