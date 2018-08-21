import { NgModule } from '@angular/core';

import { SharedModule } from './../../shared/shared.module';
import { CompanyRoutingModule } from './company-routing.module';

import * as fromContainers from './containers';
import * as fromComponents from './components';

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
