import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import * as fromContainers from '@web/app/features/f/schedule-day-hour-range/containers';

export const routes: Routes = [
  {
    path: 'schedule-day/:schedule_id/:schedule_day_id', component: fromContainers.IndexPageScheduleDayHourRangeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScheduleDayHourRangeRoutingModule { }
