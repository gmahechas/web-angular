import { NgModule } from '@angular/core';

import { SharedModule } from '@app/app/shared/shared.module';
import { CompanyRoutingModule } from '@app/app/one/company/company-routing.module';

import * as fromContainers from '@app/app/one/company/containers';
import * as fromComponents from '@app/app/one/company/components';

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
