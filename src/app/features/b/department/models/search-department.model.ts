export interface SearchDepartment {
  department?: {
    department_id?: string;
    department_name?: string;
  };
  limit?: number;
  page?: number;
}
