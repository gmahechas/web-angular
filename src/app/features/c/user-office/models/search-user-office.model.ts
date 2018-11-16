export interface SearchUserOffice {
  user_office?: {
    user_office_id?: string;
    user_office_status?: string;
  };
  user?: {
    user_id?: string;
  };
  office?: {
    office_id?: string;
  };
  limit?: number;
  page?: number;
}
