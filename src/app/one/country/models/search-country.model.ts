export interface SearchCountry {
  country?: {
    country_id?: string;
    country_name?: string;
    country_code?: string;
  };
  limit?: number;
  page?: number;
}
