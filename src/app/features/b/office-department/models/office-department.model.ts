import { Office } from '@web/app/features/b/office/models/office.model';
import { Department } from '@web/app/features/b/department/models/department.model';

export interface OfficeDepartment {
  office_department_id?: number;
  office_department_status?: boolean;
  office_id?: number;
  office?: Office;
  department_id?: number;
  department: Department;
  office_department_created_at?: string;
  office_department_updated_at?: string;
  office_department_deleted_at?: string;
}
