import { Injectable } from '@angular/core';

import { StoreDay } from '@web/app/features/f/day/models/store-day.model';

import { Mutation } from 'apollo-angular';
import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class DayStoreGQL extends Mutation<StoreDay> {

  document: DocumentNode = gql`
    mutation storeDay(
      $day_code: String,
      $day_name: String
    ) {
      storeDay(
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
