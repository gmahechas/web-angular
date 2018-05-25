import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from './dashboard.routes';

import { SharedModule } from '../../shared/shared.module';

import * as fromContainers from './containers';
import * as fromComponents from './components';

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    SharedModule
  ],
  declarations: [
    ...fromContainers.containers,
    ...fromComponents.components
  ]
})
export class DashboardModule { }
