import { Injectable } from '@angular/core';

import {
  PaginationScheduleDayHourRange
} from '@web/app/features/f/schedule-day-hour-range/models/pagination-schedule-day-hour-range.model';

import { Query } from 'apollo-angular';
import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class ScheduleDayHourRangePaginationGQL extends Query<PaginationScheduleDayHourRange> {

  document: DocumentNode = gql`
    query paginationScheduleDayHourRange(
      $schedule_day_hour_range_id: ID,
      $schedule_day_hour_range_status: Boolean,
      $schedule_day_id: ID,
      $hour_range_id: ID,
      $limit: Int,
      $page: Int
    ) {
      paginationScheduleDayHourRange(
        schedule_day_hour_range_id: $schedule_day_hour_range_id,
        schedule_day_hour_range_status: $schedule_day_hour_range_status,
        schedule_day_id: $schedule_day_id,
        hour_range_id: $hour_range_id,
        limit: $limit,
        page: $page
      ) {
        total
        per_page
        current_page
        from
        to
        data {
          schedule_day_hour_range_id
          schedule_day_hour_range_status
          schedule_day_id
          schedule_day {
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
          hour_range_id
          hour_range {
            hour_range_id
            hour_range_name
            hour_range_description
            hour_range_start
            hour_range_end
          }
        }
      }
    }
  `;
}
