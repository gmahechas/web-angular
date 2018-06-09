import { NgModule } from '@angular/core';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { SharedModule } from '../shared/shared.module';

import * as fromComponents from './components';
import * as fromContainers from './containers';
import * as fromServices from './services';
import * as fromGuards from './guards';
import * as fromInterceptors from './interceptors';
import { ProgressBarCoreComponent } from './components/progress-bar-core/progress-bar-core.component';

@NgModule({
  imports: [
    HttpClientModule,
    SharedModule
  ],
  declarations: [
    ...fromContainers.containers,
    ...fromComponents.components,
    ProgressBarCoreComponent
  ]
})
export class CoreModule {

  static forRoot() {
    return {
      ngModule: CoreModule,
      providers: [
        ...fromServices.services,
        ...fromGuards.guards,
        { provide: HTTP_INTERCEPTORS, useClass: fromInterceptors.TokenInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: fromInterceptors.RefreshTokenInterceptor, multi: true },
      ],
    };
  }
}
