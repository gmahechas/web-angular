import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import * as fromContainers from './containers';
import { CityExistGuard } from './guards/city-exist.guard';

export const routes: Routes = [
  {
    path: '', component: fromContainers.IndexPageCityComponent,
    children: [
      { path: 'create', component: fromContainers.FormPageCityComponent },
      { path: ':city_id', component: fromContainers.FormPageCityComponent, canActivate: [CityExistGuard] }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CityRoutingModule { }
