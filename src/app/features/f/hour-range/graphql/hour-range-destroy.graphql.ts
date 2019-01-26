import { Injectable } from '@angular/core';

import { DestroyHourRange } from '@web/app/features/f/hour-range/models/destroy-hour-range.model';

import { Mutation } from 'apollo-angular';
import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class HourRangeDestroyGQL extends Mutation<DestroyHourRange> {

  document: DocumentNode = gql`
    mutation destroyHourRange($hour_range_id: ID!) {
      destroyHourRange(hour_range_id: $hour_range_id) {
        hour_range_id
        hour_range_name
        hour_range_description
        hour_range_start
        hour_range_end
      }
    }
  `;

}
