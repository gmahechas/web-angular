import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import * as fromContainers from '@web/app/features/f/schedule-day/containers';

export const routes: Routes = [
  {
    path: 'schedule/:schedule_id', component: fromContainers.IndexPageScheduleDayComponent, children: [
      {
        path: 'schedule-day-hour-range',
        loadChildren: () => {
          // tslint:disable-next-line:max-line-length
          return import('@web/app/features/f/schedule-day-hour-range/schedule-day-hour-range.module').then(m => m.ScheduleDayHourRangeModule);
        },
        outlet: 'router-outlet-schedule-day-hour-range'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScheduleDayRoutingModule { }
