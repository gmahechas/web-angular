import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import * as fromContainers from '@web/app/features/f/schedule-day/containers';

export const routes: Routes = [
  {
    path: 'schedule/:schedule_id', component: fromContainers.IndexPageScheduleDayComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScheduleDayRoutingModule { }
