import { Injectable } from '@angular/core';

import * as fromGraphql from '@web/app/features/f/hour-range/graphql';

import * as fromModels from '@web/app/features/f/hour-range/models';

@Injectable({
  providedIn: 'root'
})
export class HourRangeService {

  constructor(
    private hourRangePaginationGQL: fromGraphql.HourRangePaginationGQL,
    private hourRangeStoreGQL: fromGraphql.HourRangeStoreGQL,
    private hourRangeUpdateGQL: fromGraphql.HourRangeUpdateGQL,
    private hourRangeDestroyGQL: fromGraphql.HourRangeDestroyGQL
  ) { }

  load(searchHourRange: fromModels.SearchHourRange) {
    return this.hourRangePaginationGQL.watch({
      ...searchHourRange.hour_range,
      limit: searchHourRange.limit,
      page: searchHourRange.page
    }).valueChanges;
  }

  store(hourRange: fromModels.HourRange) {
    return this.hourRangeStoreGQL.mutate(hourRange);
  }

  update(hourRange: fromModels.HourRange) {
    return this.hourRangeUpdateGQL.mutate(hourRange);
  }

  destroy(hourRange: fromModels.HourRange) {
    return this.hourRangeDestroyGQL.mutate(hourRange);
  }

  pagination(searchHourRange: fromModels.SearchHourRange) {
    return this.hourRangePaginationGQL.fetch({
      hour_range_id: searchHourRange.hour_range.hour_range_id,
      hour_range_name: searchHourRange.hour_range.hour_range_name,
      limit: searchHourRange.limit,
      page: searchHourRange.page
    });
  }

}
