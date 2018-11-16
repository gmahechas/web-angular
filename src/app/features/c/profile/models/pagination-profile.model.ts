import { Profile } from '@web/app/features/c/profile/models/profile.model';

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
