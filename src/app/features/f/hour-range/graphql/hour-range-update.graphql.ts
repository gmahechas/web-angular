import { Injectable } from '@angular/core';

import { UpdateHourRange } from '@web/app/features/f/hour-range/models/update-hour-range.model';

import { Mutation } from 'apollo-angular';
import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class HourRangeUpdateGQL extends Mutation<UpdateHourRange> {

  document: DocumentNode = gql`
    mutation updateHourRange(
      $hour_range_id: ID!
      $hour_range_name: String,
      $hour_range_description: String,
      $hour_range_start: String,
      $hour_range_end: String
    ) {
      updateHourRange(
        hour_range_id: $hour_range_id,
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
