import { City } from '@web/app/features/a/city/models/city.model';

export interface SearchOffice {
  office?: {
    office_id?: string;
    office_name?: string;
  };
  city?: City | null;
  limit?: number;
  page?: number;
}
