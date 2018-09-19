import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import * as fromContainers from './containers';
import * as fromComponents from './components';
import * as fromServices from './services'; // TODO:
import * as fromGuards from './guards'; // TODO:

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
        ...fromServices.services,
        ...fromGuards.guards
      ],
    };
  }
}
