import { Injectable } from '@angular/core';

import { DestroyDay } from '@web/app/features/f/day/models/destroy-day.model';

import { Mutation } from 'apollo-angular';
import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class DayDestroyGQL extends Mutation<DestroyDay> {

  document: DocumentNode = gql`
    mutation destroyDay($day_id: ID!) {
      destroyDay(day_id: $day_id) {
        day_id
        day_code
        day_name
      }
    }
  `;

}
