import { Injectable } from '@angular/core';

import { DestroyScheduleDay } from '@web/app/features/f/schedule-day/models/destroy-schedule-day.model';

import { Mutation } from 'apollo-angular';
import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class ScheduleDayDestroyGQL extends Mutation<DestroyScheduleDay> {

  document: DocumentNode = gql`
    mutation destroyScheduleDay($schedule_day_id: ID!) {
      destroyScheduleDay(schedule_day_id: $schedule_day_id) {
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
  `;

}
