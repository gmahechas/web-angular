import { Injectable } from '@angular/core';

import { PaginationProfile } from '../models/pagination-profile.model';

import { Query } from 'apollo-angular';
import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class ProfilePaginationGQL extends Query<PaginationProfile> {

document: DocumentNode = gql`
  query paginationProfile(
    $profile_id: ID,
    $profile_name: String,
    $limit: Int,
    $page: Int
  ) {
    paginationProfile(
      profile_id: $profile_id,
      profile_name: $profile_name,
      limit: $limit,
      page: $page
    ) {
      total
      per_page
      current_page
      from
      to
      data {
        profile_id
        profile_name
        profile_created_at
        profile_updated_at
        profile_deleted_at
      }
    }
  }
`;

}
