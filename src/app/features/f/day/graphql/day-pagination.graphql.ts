import { Injectable } from '@angular/core';

import { PaginationDay } from '@web/app/features/f/day/models/pagination-day.model';

import { Query } from 'apollo-angular';
import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class DayPaginationGQL extends Query<PaginationDay> {

  document: DocumentNode = gql`
    query paginationDay(
      $day_id: ID,
      $day_name: String,
      $limit: Int,
      $page: Int
    ) {
      paginationDay(
        day_id: $day_id,
        day_name: $day_name,
        limit: $limit,
        page: $page
      ) {
        total
        per_page
        current_page
        from
        to
        data {
          day_id
          day_code
          day_name
        }
      }
    }
  `;
}
