import { Office } from '@web/app/features/b/office/models/office.model';
import { Department } from '@web/app/features/b/department/models/department.model';

export interface SearchOfficeDepartment {
  office_department?: {
    office_department_id?: string;
    office_department_status?: boolean | null;
  };
  office?: Office;
  department?: Department;
  limit?: number;
  page?: number;
}
