import { City } from '../../../one/city/models';
import { Office } from './../../../one/office/models/office.model';

export interface SearchMacroproject {
  macroproject?: {
    macroproject_id?: string;
    macroproject_name?: string;
  };
  city?: City | null;
  office?: Office | null;
  limit?: number;
  page?: number;
}
