import { Injectable } from '@angular/core';

import * as fromGraphql from '@web/app/features/f/day/graphql';

import * as fromModels from '@web/app/features/f/day/models';

@Injectable({
  providedIn: 'root'
})
export class DayService {

  constructor(
    private dayPaginationGQL: fromGraphql.DayPaginationGQL
  ) { }

  load(searchDay: fromModels.SearchDay) {
    return this.dayPaginationGQL.watch({
      ...searchDay.day,
      limit: searchDay.limit,
      page: searchDay.page
    }).valueChanges;
  }

}
