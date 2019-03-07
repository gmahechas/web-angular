import { Injectable } from '@angular/core';

import { DestroyScheduleDayHourRange } from '@web/app/features/f/schedule-day-hour-range/models/destroy-schedule-day-hour-range.model';

import { Mutation } from 'apollo-angular';
import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class ScheduleDayHourRangeDestroyGQL extends Mutation<DestroyScheduleDayHourRange> {

  document: DocumentNode = gql`
    mutation destroyScheduleDayHourRange($schedule_day_hour_range_id: ID!) {
      destroyScheduleDayHourRange(schedule_day_hour_range_id: $schedule_day_hour_range_id) {
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
