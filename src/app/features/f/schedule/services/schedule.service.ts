import { Injectable } from '@angular/core';

import { QueryRef } from 'apollo-angular';
import * as fromGraphql from '@web/app/features/f/schedule/graphql';

import * as fromModels from '@web/app/features/f/schedule/models';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  queryRef: QueryRef<fromModels.PaginationSchedule>;

  constructor(
    private schedulePaginationGQL: fromGraphql.SchedulePaginationGQL,
    private scheduleStoreGQL: fromGraphql.ScheduleStoreGQL,
    private scheduleUpdateGQL: fromGraphql.ScheduleUpdateGQL,
    private scheduleDestroyGQL: fromGraphql.ScheduleDestroyGQL
  ) { }

  load(searchSchedule: fromModels.SearchSchedule) {
    this.queryRef = this.schedulePaginationGQL.watch({
      ...searchSchedule.schedule,
      limit: searchSchedule.limit,
      page: searchSchedule.page
    });

    return this.queryRef.valueChanges;
  }

  store(schedule: fromModels.Schedule) {
    return this.scheduleStoreGQL.mutate(schedule);
  }

  update(schedule: fromModels.Schedule) {
    return this.scheduleUpdateGQL.mutate(schedule);
  }

  destroy(schedule: fromModels.Schedule) {
    return this.scheduleDestroyGQL.mutate(schedule);
  }

  pagination(searchSchedule: fromModels.SearchSchedule) {

    return this.queryRef.fetchMore({
      query: this.schedulePaginationGQL.document,
      variables: {
        schedule_id: searchSchedule.schedule.schedule_id,
        schedule_name: searchSchedule.schedule.schedule_name,
        limit: searchSchedule.limit,
        page: searchSchedule.page
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) { return prev; }
        return Object.assign({}, prev, [prev, fetchMoreResult]);
      }
    });
  }

}
