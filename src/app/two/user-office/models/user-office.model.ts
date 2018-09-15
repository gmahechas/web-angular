import { User } from '../../user/models';
import { Office } from './../../../one/office/models/office.model';

export interface UserOffice {
  user_office_id?: number;
  user_office_status?: boolean;
  user_office_created_at?: string;
  user_office_updated_at?: string;
  user_office_deleted_at?: string;
  user_id?: number;
  user?: User;
  office_id?: number;
  office?: Office;
}
