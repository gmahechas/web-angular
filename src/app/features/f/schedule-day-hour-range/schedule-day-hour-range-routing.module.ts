import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import * as fromContainers from '@web/app/features/f/schedule-day-hour-range/containers';
import { ScheduleDayHourRangeExistGuard } from '@web/app/features/f/schedule-day-hour-range/guards/schedule-day-hour-range-exist.guard';

export const routes: Routes = [
  {
    path: 'schedule_day/:schedule_id/:schedule_day_id', component: fromContainers.IndexPageScheduleDayHourRangeComponent
  },
  {
    path: 'hour_range/:hour_range_id', component: fromContainers.IndexPageScheduleDayHourRangeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScheduleDayHourRangeRoutingModule { }
