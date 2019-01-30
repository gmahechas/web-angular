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
    private dayPaginationGQL: fromGraphql.DayPaginationGQL,
    private dayStoreGQL: fromGraphql.DayStoreGQL,
    private dayUpdateGQL: fromGraphql.DayUpdateGQL,
    private dayDestroyGQL: fromGraphql.DayDestroyGQL
  ) { }

  load(searchDay: fromModels.SearchDay) {
    this.queryRef = this.dayPaginationGQL.watch({
      ...searchDay.day,
      limit: searchDay.limit,
      page: searchDay.page
    });

    return this.queryRef.valueChanges;
  }

  store(day: fromModels.Day) {
    return this.dayStoreGQL.mutate(day);
  }

  update(day: fromModels.Day) {
    return this.dayUpdateGQL.mutate(day);
  }

  destroy(day: fromModels.Day) {
    return this.dayDestroyGQL.mutate(day);
  }

  pagination(searchDay: fromModels.SearchDay) {

    return this.queryRef.fetchMore({
      query: this.dayPaginationGQL.document,
      variables: {
        day_id: searchDay.day.day_id,
        day_name: searchDay.day.day_name,
        limit: searchDay.limit,
        page: searchDay.page
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) { return prev; }
        return fetchMoreResult;
      }
    });
  }

}
