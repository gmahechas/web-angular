import { NgModule } from '@angular/core';

import { SharedModule } from '@web/app/shared/shared.module';
import { DashboardRoutingModule } from '@web/app/zero/dashboard/dashboard-routing.module';

import * as fromContainers from '@web/app/zero/dashboard/containers';
import * as fromComponents from '@web/app/zero/dashboard/components';

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
