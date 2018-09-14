import { City } from '../../../one/city/models';
import { Office } from './../../../one/office/models/office.model';

export interface SearchMacroproject {
  macroproject?: {
    macroproject_id?: string;
    macroproject_name?: string;
  };
  city?: City;
  office?: Office;
  limit?: number;
  page?: number;
}
