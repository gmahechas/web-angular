import { Country } from '@app/app/one/country/models/country.model';

export interface PaginationCountry {
  paginationCountry: {
    total?: number;
    per_page?: number;
    current_page?: number;
    from?: number;
    to?: number;
    data?: Country[];
  };
}
