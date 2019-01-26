import { Injectable } from '@angular/core';

import { PaginationHourRange } from '@web/app/features/f/hour-range/models/pagination-hour-range.model';

import { Query } from 'apollo-angular';
import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class HourRangePaginationGQL extends Query<PaginationHourRange> {

  document: DocumentNode = gql`
    query paginationHourRange(
      $hour_range_id: ID,
      $hour_range_name: String,
      $limit: Int,
      $page: Int
    ) {
      paginationHourRange(
        hour_range_id: $hour_range_id,
        hour_range_name: $hour_range_name,
        limit: $limit,
        page: $page
      ) {
        total
        per_page
        current_page
        from
        to
        data {
          hour_range_id
          hour_range_name
          hour_range_description
          hour_range_start
          hour_range_end
        }
      }
    }
  `;
}
