
import { Routes } from '@angular/router';

import * as fromContainers from './containers';
import { CountryGuard } from './guards/country.guard';

export const routes: Routes = [
  {
    path: '', component: fromContainers.IndexPageCountryComponent,
    children: [
      { path: 'create', component: fromContainers.FormPageCountryComponent },
      { path: ':country_id', component: fromContainers.FormPageCountryComponent, canActivate: [CountryGuard] }
    ]
  }
];
