import { City } from '@web/app/features/b/city/models';
import { Office } from '@web/app/features/b/office/models/office.model';

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
