import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import * as fromContainers from '@web/app/features/f/schedule/containers';
import { ScheduleExistGuard } from '@web/app/features/f/schedule/guards/schedule-exist.guard';

export const routes: Routes = [
  {
    path: '', component: fromContainers.IndexPageScheduleComponent,
    children: [
      { path: 'create', component: fromContainers.FormPageScheduleComponent },
      {
        path: ':schedule_id', component: fromContainers.FormPageScheduleComponent, canActivate: [ScheduleExistGuard], children: [
          {
            path: 'schedule-day',
            loadChildren: () => {
              return import('@web/app/features/f/schedule-day/schedule-day.module').then(m => m.ScheduleDayModule);
            },
            outlet: 'router-outlet-schedule-day'
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
export class ScheduleRoutingModule { }
