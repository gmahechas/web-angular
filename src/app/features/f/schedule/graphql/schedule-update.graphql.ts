import { Injectable } from '@angular/core';

import { UpdateSchedule } from '@web/app/features/f/schedule/models/update-schedule.model';

import { Mutation } from 'apollo-angular';
import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class ScheduleUpdateGQL extends Mutation<UpdateSchedule> {

  document: DocumentNode = gql`
    mutation updateSchedule($schedule_id: ID!, $schedule_name: String) {
      updateSchedule(schedule_id: $schedule_id, schedule_name: $schedule_name) {
        schedule_id
        schedule_name
      }
    }
  `;

}
