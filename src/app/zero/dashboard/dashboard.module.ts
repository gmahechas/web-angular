import { NgModule } from '@angular/core';

import { SharedModule } from '@app/app/shared/shared.module';
import { DashboardRoutingModule } from '@app/app/zero/dashboard/dashboard-routing.module';

import * as fromContainers from '@app/app/zero/dashboard/containers';
import * as fromComponents from '@app/app/zero/dashboard/components';

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
