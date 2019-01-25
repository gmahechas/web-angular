import { Injectable } from '@angular/core';

import { DestroySchedule } from '@web/app/features/f/schedule/models/destroy-schedule.model';

import { Mutation } from 'apollo-angular';
import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class ScheduleDestroyGQL extends Mutation<DestroySchedule> {

  document: DocumentNode = gql`
    mutation destroySchedule($schedule_id: ID!) {
      destroySchedule(schedule_id: $schedule_id) {
        schedule_id
        schedule_name
      }
    }
  `;

}
