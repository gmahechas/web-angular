import { Office } from './../../../one/office/models/office.model';
import { City } from './../../../one/city/models/city.model';

export interface Macroproject {
  macroproject_id?: number;
  macroproject_name?: string;
  macroproject_address?: string;
  macroproject_phone?: string;
  macroproject_created_at?: string;
  macroproject_updated_at?: string;
  macroproject_deleted_at?: string;
  city_id?: number;
  city?: City;
  office_id?: number;
  office?: Office;
}
