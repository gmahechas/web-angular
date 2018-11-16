import { NgModule } from '@angular/core';

import { SharedModule } from '@web/app/shared/shared.module';
import { DashboardRoutingModule } from '@web/app/dashboard/dashboard-routing.module';

import * as fromContainers from '@web/app/dashboard/containers';
import * as fromComponents from '@web/app/dashboard/components';

@NgModule({
  imports: [
    SharedModule,
    DashboardRoutingModule
  ],
  declarations: [
    ...fromContainers.containers,
    ...fromComponents.components
  ]
})
export class DashboardModule { }
