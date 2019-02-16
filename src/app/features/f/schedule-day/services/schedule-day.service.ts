import { Injectable } from '@angular/core';

import { QueryRef } from 'apollo-angular';
import * as fromGraphql from '@web/app/features/f/schedule-day/graphql';

import * as fromModels from '@web/app/features/f/schedule-day/models';

@Injectable({
  providedIn: 'root'
})
export class ScheduleDayService {

  queryRef: QueryRef<fromModels.PaginationScheduleDay>;

  constructor(
    private scheduleDayPaginationGQL: fromGraphql.ScheduleDayPaginationGQL,
    private scheduleDayStoreGQL: fromGraphql.ScheduleDayStoreGQL,
    private scheduleDayUpdateGQL: fromGraphql.ScheduleDayUpdateGQL,
    private scheduleDayDestroyGQL: fromGraphql.ScheduleDayDestroyGQL
  ) { }

  load(searchScheduleDay: fromModels.SearchScheduleDay) {
    this.queryRef = this.scheduleDayPaginationGQL.watch({
      ...searchScheduleDay.schedule_day,
      schedule_id: (searchScheduleDay.schedule) ? searchScheduleDay.schedule.schedule_id : null,
      day_id: (searchScheduleDay.day) ? searchScheduleDay.day.day_id : null,
      limit: searchScheduleDay.limit,
      page: searchScheduleDay.page
    });

    return this.queryRef.valueChanges;
  }

  store(scheduleDay: fromModels.ScheduleDay) {
    return this.scheduleDayStoreGQL.mutate(scheduleDay);
  }

  update(scheduleDay: fromModels.ScheduleDay) {
    return this.scheduleDayUpdateGQL.mutate(scheduleDay);
  }

  destroy(scheduleDay: fromModels.ScheduleDay) {
    return this.scheduleDayDestroyGQL.mutate(scheduleDay);
  }

  pagination(searchScheduleDay: fromModels.SearchScheduleDay) {

    return this.queryRef.fetchMore({
      query: this.scheduleDayPaginationGQL.document,
      variables: {
        schedule_day_id: searchScheduleDay.schedule_day.schedule_day_id,
        schedule_day_status: searchScheduleDay.schedule_day.schedule_day_status,
        schedule_id: (searchScheduleDay.schedule) ? searchScheduleDay.schedule.schedule_id : null,
        day_id: (searchScheduleDay.day) ? searchScheduleDay.day.day_id : null,
        limit: searchScheduleDay.limit,
        page: searchScheduleDay.page
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) { return prev; }
        return Object.assign({}, prev, [prev, fetchMoreResult]);
      }
    });
  }

}
