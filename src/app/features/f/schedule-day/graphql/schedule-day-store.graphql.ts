import { Injectable } from '@angular/core';

import { StoreScheduleDay } from '@web/app/features/f/schedule-day/models/store-schedule-day.model';

import { Mutation } from 'apollo-angular';
import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class ScheduleDayStoreGQL extends Mutation<StoreScheduleDay> {

  document: DocumentNode = gql`
    mutation storeScheduleDay(
      $schedule_day_status: Boolean!,
      $schedule_id: ID!,
      $day_id: ID!,
    ) {
      storeScheduleDay(
        schedule_day_status: $schedule_day_status,
        schedule_id: $schedule_id,
        day_id: $day_id,
      ) {
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
