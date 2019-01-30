import { Injectable } from '@angular/core';

import { QueryRef } from 'apollo-angular';
import * as fromGraphql from '@web/app/features/f/day/graphql';

import * as fromModels from '@web/app/features/f/day/models';

@Injectable({
  providedIn: 'root'
})
export class DayService {

  queryRef: QueryRef<fromModels.PaginationDay>;

  constructor(
    private dayPaginationGQL: fromGraphql.DayPaginationGQL
  ) { }

  load(searchDay: fromModels.SearchDay) {
    this.queryRef = this.dayPaginationGQL.watch({
      ...searchDay.day,
      limit: searchDay.limit,
      page: searchDay.page
    });

    return this.queryRef.valueChanges;
  }

}
