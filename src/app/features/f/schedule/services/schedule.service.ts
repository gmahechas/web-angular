import { Injectable } from '@angular/core';

import * as fromGraphql from '@web/app/features/f/schedule/graphql';

import * as fromModels from '@web/app/features/f/schedule/models';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  constructor(
    private schedulePaginationGQL: fromGraphql.SchedulePaginationGQL,
    private scheduleStoreGQL: fromGraphql.ScheduleStoreGQL,
    private scheduleUpdateGQL: fromGraphql.ScheduleUpdateGQL,
    private scheduleDestroyGQL: fromGraphql.ScheduleDestroyGQL
  ) { }

  load(searchSchedule: fromModels.SearchSchedule) {
    return this.schedulePaginationGQL.watch({
      ...searchSchedule.schedule,
      limit: searchSchedule.limit,
      page: searchSchedule.page
    }).valueChanges;
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
    return this.schedulePaginationGQL.fetch({
      schedule_id: searchSchedule.schedule.schedule_id,
      schedule_name: searchSchedule.schedule.schedule_name,
      limit: searchSchedule.limit,
      page: searchSchedule.page
    });
  }

}
