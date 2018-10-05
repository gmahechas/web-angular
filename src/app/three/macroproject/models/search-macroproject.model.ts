import { City } from '@app/app/one/city/models';
import { Office } from '@app/app/one/office/models/office.model';

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
