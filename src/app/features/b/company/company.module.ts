import { NgModule } from '@angular/core';

import { SharedModule } from '@web/app/shared/shared.module';
import { CompanyRoutingModule } from '@web/app/features/b/company/company-routing.module';

import * as fromContainers from '@web/app/features/b/company/containers';
import * as fromComponents from '@web/app/features/b/company/components';

@NgModule({
  imports: [
    SharedModule,
    CompanyRoutingModule
  ],
  declarations: [
    ...fromContainers.containers,
    ...fromComponents.components,
  ]
})
export class CompanyModule { }
