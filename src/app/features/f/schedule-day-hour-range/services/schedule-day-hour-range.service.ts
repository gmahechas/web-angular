import { Injectable } from '@angular/core';

import { QueryRef } from 'apollo-angular';
import * as fromGraphql from '@web/app/features/f/schedule-day-hour-range/graphql';

import * as fromModels from '@web/app/features/f/schedule-day-hour-range/models';

@Injectable({
  providedIn: 'root'
})
export class ScheduleDayHourRangeService {

  queryRef: QueryRef<fromModels.PaginationScheduleDayHourRange>;

  constructor(
    private scheduleDayHourRangePaginationGQL: fromGraphql.ScheduleDayHourRangePaginationGQL,
    private scheduleDayHourRangeStoreGQL: fromGraphql.ScheduleDayHourRangeStoreGQL,
    private scheduleDayHourRangeUpdateGQL: fromGraphql.ScheduleDayHourRangeUpdateGQL,
    private scheduleDayHourRangeDestroyGQL: fromGraphql.ScheduleDayHourRangeDestroyGQL
  ) { }

  load(searchScheduleDayHourRange: fromModels.SearchScheduleDayHourRange) {
    this.queryRef = this.scheduleDayHourRangePaginationGQL.watch({
      ...searchScheduleDayHourRange.schedule_day_hour_range,
      schedule_day_id: (searchScheduleDayHourRange.schedule_day) ? searchScheduleDayHourRange.schedule_day.schedule_day_id : null,
      hour_range_id: (searchScheduleDayHourRange.hour_range) ? searchScheduleDayHourRange.hour_range.hour_range_id : null,
      limit: searchScheduleDayHourRange.limit,
      page: searchScheduleDayHourRange.page
    });

    return this.queryRef.valueChanges;
  }

  store(scheduleDayHourRange: fromModels.ScheduleDayHourRange) {
    return this.scheduleDayHourRangeStoreGQL.mutate(scheduleDayHourRange);
  }

  update(scheduleDayHourRange: fromModels.ScheduleDayHourRange) {
    return this.scheduleDayHourRangeUpdateGQL.mutate(scheduleDayHourRange);
  }

  destroy(scheduleDayHourRange: fromModels.ScheduleDayHourRange) {
    return this.scheduleDayHourRangeDestroyGQL.mutate(scheduleDayHourRange);
  }

  pagination(searchScheduleDayHourRange: fromModels.SearchScheduleDayHourRange) {

    return this.queryRef.fetchMore({
      query: this.scheduleDayHourRangePaginationGQL.document,
      variables: {
        schedule_day_hour_range_id: searchScheduleDayHourRange.schedule_day_hour_range.schedule_day_hour_range_id,
        schedule_day_hour_range_status: searchScheduleDayHourRange.schedule_day_hour_range.schedule_day_hour_range_status,
        schedule_day_id: (searchScheduleDayHourRange.schedule_day) ? searchScheduleDayHourRange.schedule_day.schedule_day_id : null,
        hour_range_id: (searchScheduleDayHourRange.hour_range) ? searchScheduleDayHourRange.hour_range.hour_range_id : null,
        limit: searchScheduleDayHourRange.limit,
        page: searchScheduleDayHourRange.page
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) { return prev; }
        return Object.assign({}, prev, [prev, fetchMoreResult]);
      }
    });
  }

}
