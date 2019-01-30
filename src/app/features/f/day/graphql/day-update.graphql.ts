import { Injectable } from '@angular/core';

import { UpdateDay } from '@web/app/features/f/day/models/update-day.model';

import { Mutation } from 'apollo-angular';
import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class DayUpdateGQL extends Mutation<UpdateDay> {

  document: DocumentNode = gql`
    mutation updateDay(
      $day_id: ID!,
      $day_code: String,
      $day_name: String
      ) {
      updateDay(
        day_id: $day_id,
        day_code: $day_code,
        day_name: $day_name
      ) {
        day_id
        day_code
        day_name
      }
    }
  `;

}
