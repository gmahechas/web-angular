import { Routes } from '@angular/router';

import * as fromContainers from './containers';

export const routes: Routes = [
  {
    path: 'auth', component: fromContainers.IndexPageAuthComponent
  }
];
