import { Injectable } from '@angular/core';

import { PaginationSchedule } from '@web/app/features/f/schedule/models/pagination-schedule.model';

import { Query } from 'apollo-angular';
import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class SchedulePaginationGQL extends Query<PaginationSchedule> {

  document: DocumentNode = gql`
    query paginationSchedule(
      $schedule_id: ID,
      $schedule_name: String,
      $limit: Int,
      $page: Int
    ) {
      paginationSchedule(
        schedule_id: $schedule_id,
        schedule_name: $schedule_name,
        limit: $limit,
        page: $page
      ) {
        total
        per_page
        current_page
        from
        to
        data {
          schedule_id
          schedule_name
        }
      }
    }
  `;
}
