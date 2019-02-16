import { Injectable } from '@angular/core';

import { UpdateScheduleDay } from '@web/app/features/f/schedule-day/models/update-schedule-day.model';

import { Mutation } from 'apollo-angular';
import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class ScheduleDayUpdateGQL extends Mutation<UpdateScheduleDay> {

  document: DocumentNode = gql`
    mutation updateScheduleDay($schedule_day_id: ID!, $schedule_day_status: Boolean!) {
      updateScheduleDay(schedule_day_id: $schedule_day_id, schedule_day_status: $schedule_day_status) {
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
