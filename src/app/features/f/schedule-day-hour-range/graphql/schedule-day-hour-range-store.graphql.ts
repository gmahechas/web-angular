import { Injectable } from '@angular/core';

import { StoreScheduleDayHourRange } from '@web/app/features/f/schedule-day-hour-range/models/store-schedule-day-hour-range.model';

import { Mutation } from 'apollo-angular';
import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class ScheduleDayHourRangeStoreGQL extends Mutation<StoreScheduleDayHourRange> {

  document: DocumentNode = gql`
    mutation storeScheduleDayHourRange(
      $schedule_day_hour_range_status: Boolean,
      $schedule_day_id: ID!,
      $hour_range_id: ID!
    ) {
      storeScheduleDayHourRange(
        schedule_day_hour_range_status: $schedule_day_hour_range_status,
        schedule_day_id: $schedule_day_id,
        hour_range_id: $hour_range_id
      ) {
        schedule_day_hour_range_id
        schedule_day_hour_range_status
        schedule_day_id
        hour_range_id
      }
    }
  `;

}
