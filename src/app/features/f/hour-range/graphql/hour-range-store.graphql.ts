import { Injectable } from '@angular/core';

import { StoreHourRange } from '@web/app/features/f/hour-range/models/store-hour-range.model';

import { Mutation } from 'apollo-angular';
import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class HourRangeStoreGQL extends Mutation<StoreHourRange> {

  document: DocumentNode = gql`
    mutation storeHourRange(
      $hour_range_name: String,
      $hour_range_description: String,
      $hour_range_start: String,
      $hour_range_end: String
    ) {
      storeHourRange(
        hour_range_name: $hour_range_name,
        hour_range_description: $hour_range_description,
        hour_range_start: $hour_range_start,
        hour_range_end: $hour_range_end
      ) {
        hour_range_id
        hour_range_name
        hour_range_description
        hour_range_start
        hour_range_end
      }
    }
  `;

}
