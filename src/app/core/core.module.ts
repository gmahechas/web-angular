import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@web/app/shared/shared.module';

import * as fromContainers from '@web/app/core/containers';
import * as fromComponents from '@web/app/core/components';
import * as fromServices from '@web/app/core/services';

@NgModule({
  imports: [
    SharedModule,
    RouterModule
  ],
  declarations: [
    ...fromContainers.containers,
    ...fromComponents.components
  ],
  exports: [
    ...fromContainers.containers
  ]
})
export class CoreModule {

  static forRoot() {
    return {
      ngModule: CoreModule,
      providers: [
        ...fromServices.services
      ],
    };
  }
}
