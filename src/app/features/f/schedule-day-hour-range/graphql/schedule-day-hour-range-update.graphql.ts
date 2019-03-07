import { Injectable } from '@angular/core';

import { UpdateScheduleDayHourRange } from '@web/app/features/f/schedule-day-hour-range/models/update-schedule-day-hour-range.model';

import { Mutation } from 'apollo-angular';
import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class ScheduleDayHourRangeUpdateGQL extends Mutation<UpdateScheduleDayHourRange> {

  document: DocumentNode = gql`
    mutation updateScheduleDayHourRange(
      $schedule_day_hour_range_id: ID!,
      $schedule_day_hour_range_status: Boolean
    ) {
      updateScheduleDayHourRange(
        schedule_day_hour_range_id: $schedule_day_hour_range_id,
        schedule_day_hour_range_status: $schedule_day_hour_range_status
      ) {
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
  `;

}
