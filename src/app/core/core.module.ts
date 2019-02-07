import { NgModule, ModuleWithProviders } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers, effects, metaReducers } from '@web/app/core/store';
import { StoreRouterConnectingModule, RouterStateSerializer } from '@ngrx/router-store';
import { CustomPreload, CustomRouterStateSerializer } from '@web/app/shared/router-utils';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { SharedModule } from '@web/app/shared/shared.module';

import * as fromContainers from '@web/app/core/containers';
import * as fromComponents from '@web/app/core/components';
import * as fromServices from '@web/app/core/services';

import { httpInterceptorProviders } from '@web/app/core/interceptors/index';

import { environment } from '@web/environments/environment';

@NgModule({
  imports: [
    SharedModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreRouterConnectingModule.forRoot({
      stateKey: 'router',
    }),
    StoreDevtoolsModule.instrument({
      name: 'NgRx Web Store DevTools',
      maxAge: 25,
      logOnly: environment.production
    }),
    EffectsModule.forRoot(effects),
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

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        CustomPreload,
        { provide: RouterStateSerializer, useClass: CustomRouterStateSerializer },
        httpInterceptorProviders,
        ...fromServices.services,
      ],
    };
  }
}
