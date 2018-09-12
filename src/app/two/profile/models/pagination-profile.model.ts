import { Profile } from './profile.model';

export interface PaginationProfile {
  paginationProfile: {
    total?: number;
    per_page?: number;
    current_page?: number;
    from?: number;
    to?: number;
    data?: Profile[];
  };
}
