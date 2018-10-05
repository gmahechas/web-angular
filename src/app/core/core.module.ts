import { NgModule } from '@angular/core';

import { SharedModule } from '@app/app/shared/shared.module';

import * as fromContainers from '@app/app/core/containers';
import * as fromComponents from '@app/app/core/components';
import * as fromServices from '@app/app/core/services'; // TODO: providedIn

@NgModule({
  imports: [
    SharedModule
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
