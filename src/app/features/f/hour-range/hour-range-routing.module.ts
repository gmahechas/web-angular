import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import * as fromContainers from '@web/app/features/f/hour-range/containers';
import { HourRangeExistGuard } from '@web/app/features/f/hour-range/guards/hour-range-exist.guard';

export const routes: Routes = [
  {
    path: '', component: fromContainers.IndexPageHourRangeComponent,
    children: [
      { path: 'create', component: fromContainers.FormPageHourRangeComponent },
      {
        path: ':hour_range_id', component: fromContainers.FormPageHourRangeComponent, canActivate: [HourRangeExistGuard], children: [
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
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HourRangeRoutingModule { }
