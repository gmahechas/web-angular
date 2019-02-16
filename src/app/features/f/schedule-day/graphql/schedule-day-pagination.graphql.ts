import { Injectable } from '@angular/core';

import { PaginationScheduleDay } from '@web/app/features/f/schedule-day/models/pagination-schedule-day.model';

import { Query } from 'apollo-angular';
import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class ScheduleDayPaginationGQL extends Query<PaginationScheduleDay> {

  document: DocumentNode = gql`
    query paginationScheduleDay(
      $schedule_day_id: ID,
      $schedule_day_status: Boolean,
      $schedule_id: ID,
      $day_id: ID,
      $limit: Int,
      $page: Int
    ) {
      paginationScheduleDay(
        schedule_day_id: $schedule_day_id,
        schedule_day_status: $schedule_day_status,
        schedule_id: $schedule_id,
        day_id: $day_id,
        limit: $limit,
        page: $page
      ) {
        total
        per_page
        current_page
        from
        to
        data {
          schedule_day_id
          schedule_day_status
          schedule_id
          schedule {
            schedule_id
            schedule_name
          }
          day_id
          day {
            day_id
            day_code
            day_name
          }
        }
      }
    }
  `;
}
