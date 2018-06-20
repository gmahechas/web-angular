import { Routes } from '@angular/router';

import * as fromContainers from './containers';
import { EstateExistGuard } from './guards/estate-exist.guard';

export const routes: Routes = [
  {
    path: '', component: fromContainers.IndexPageEstateComponent,
    children: [
      { path: 'create', component: fromContainers.FormPageEstateComponent },
      { path: ':estate_id', component: fromContainers.FormPageEstateComponent, canActivate: [EstateExistGuard] }
    ]
  }
];