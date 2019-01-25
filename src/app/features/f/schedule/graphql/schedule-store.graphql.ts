import { Injectable } from '@angular/core';

import { StoreSchedule } from '@web/app/features/f/schedule/models/store-schedule.model';

import { Mutation } from 'apollo-angular';
import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class ScheduleStoreGQL extends Mutation<StoreSchedule> {

  document: DocumentNode = gql`
    mutation storeSchedule($schedule_name: String!) {
      storeSchedule(schedule_name: $schedule_name) {
        schedule_id
        schedule_name
      }
    }
  `;

}
