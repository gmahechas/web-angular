import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import * as fromContainers from '@web/app/features/f/day/containers';
import { DayExistGuard } from '@web/app/features/f/day/guards/day-exist.guard';

export const routes: Routes = [
  {
    path: '', component: fromContainers.IndexPageDayComponent,
    children: [
      { path: 'create', component: fromContainers.FormPageDayComponent },
      { path: ':day_id', component: fromContainers.FormPageDayComponent, canActivate: [DayExistGuard] }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DayRoutingModule { }
